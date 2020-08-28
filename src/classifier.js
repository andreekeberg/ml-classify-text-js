import XRegExp from 'xregexp'
import Model from './model'
import Prediction from './prediction'

/**
 * @param {(Model|Object)} [model]
 * @param {int} [model.nGramMin=1] - Minimum n-gram size
 * @param {int} [model.nGramMax=1] - Maximum n-gram size
 * @param {(Array|Set|false)} [model.vocabulary=[]] - Terms mapped to indexes in the model data entries, set to false to store terms directly in the data entries
 * @param {Object} [model.data={}] - Key-value store containing all training data
 * @constructor
 */
class Classifier {
    constructor(model = {}) {
        if (!(model instanceof Model)) {
            model = new Model(model)
        }

        this._model = model
    }

    /**
     * Model instance
     *
     * @type {Model}
     */
    get model() {
        return this._model
    }

    set model(model) {
        if (!(model instanceof Model)) {
            model = new Model(model)
        }

        this._model = model
    }

    /**
     * Train the current model using an input string (or array of strings) and a corresponding label
     *
     * @param {(string|string[])} input - String, or an array of strings
     * @param {string} label - Corresponding label
     * @return {this}
     */
    train(input, label) {
        if (typeof input !== 'string' && !(input instanceof Array)) {
            throw new Error('input must be either a string or Array')
        }

        if (typeof label !== 'string') {
            throw new Error('label must be a string')
        }

        // If input isn't an array, convert to a single item array
        if (!(input instanceof Array)) {
            input = [input]
        }

        input.forEach(string => {
            // Convert the string to a tokenized object
            let tokens = this.tokenize(string)

            // If we're using a vocabulary, convert the tokens to a vector where all
            // indexes reference vocabulary terms (all terms not already in the
            // vocabulary are automatically added)
            if (this._model.vocabulary !== false) {
                tokens = this.vectorize(tokens)
            }

            // Set up an empty entry for the label if it does not exist 
            if (typeof this._model.data[label] === 'undefined') {
                this._model.data[label] = {}
            }

            // Add all occurrences to our model entry
            Object.keys(tokens).forEach(index => {
                let occurrences = tokens[index]

                if (typeof this._model.data[label][index] === 'undefined') {
                    this._model.data[label][index] = 0
                }

                this._model.data[label][index] += occurrences
            })
        })

        return this
    }

    /**
     * Return an array of one or more Prediction instances
     *
     * @param {string} input - Input string to make a prediction from
     * @param {int} [maxMatches=1] Maximum number of predictions to return
     * @param {float} [minimumConfidence=0.2] Minimum confidence required to include a prediction
     * @return {Array}
     */
    predict(input, maxMatches = 1, minimumConfidence = 0.2) {
        if (typeof input !== 'string') {
            throw new Error('input must be a string')
        }

        if (typeof minimumConfidence !== 'number') {
            throw new Error('minimumConfidence must be a number')
        }

        if (minimumConfidence < 0) {
            throw new Error('minimumConfidence can not be lower than 0')
        }

        if (minimumConfidence > 1) {
            throw new Error('minimumConfidence can not be higher than 1')
        }

        let tokens = this.tokenize(input)

        if (this.vocabulary !== false) {
            tokens = this.vectorize(tokens)
        }

        let predictions = []

        Object.keys(this._model.data).forEach(label => {
            let entry = this._model.data[label]

            let confidence = this.cosineSimilarity(tokens, entry)

            if (confidence >= minimumConfidence) {
                predictions.push(new Prediction({
                    label,
                    confidence
                }))
            }
        })

        /* istanbul ignore next */
        predictions.sort((a, b) => {
            if (a.confidence === b.confidence) {
                return 0
            }

            return a.confidence > b.confidence ? -1 : 1
        })

        return predictions.slice(0, Math.min(predictions.length, maxMatches))
    }

    /**
     * Split a string into an array of lowercase words, with all non-letter characters removed
     * 
     * @param {string} input
     * @return {Array}
     */
    splitWords(input) {
        if (typeof input !== 'string') {
            throw new Error('input must be a string')
        }

        // Remove all apostrophes and dashes to keep words intact
        input = input.replace(/'|´|’|-/g, '')

        // Lowercase all letters and replace all non-letter characters with a space
        input = XRegExp.replace(input.toLocaleLowerCase(), XRegExp('\\P{L}+', 'g'), ' ').trim()

        return input.split(' ')
    }

    /**
     * Create an object literal of unique tokens (n-grams) as keys, and their
     * respective occurrences as values based on an input string, or array of words
     *
     * @param {(string|string[])} input
     * @return {Object}
     */
    tokenize(input) {
        let words = typeof input === 'string' ? this.splitWords(input) : input

        if (!(words instanceof Array)) {
            throw new Error('input must be either a string or Array')
        }
        
        if (this._model.nGramMax < this._model.nGramMin) {
            throw new Error('Invalid nGramMin/nGramMax combination in model config')
        }

        let tokens = {}

        // Generate a list of n-grams along with their respective occurrences
        // based on the models configured min/max values
        words.forEach((word, index) => {
            let sequence = ''

            words.slice(index).forEach(nextWord => {
                sequence += sequence ? (' ' + nextWord) : nextWord
                let tokenCount = sequence.split(' ').length

                if (tokenCount < this._model.nGramMin || tokenCount > this._model.nGramMax) {
                    return
                }

                if (typeof tokens[sequence] === 'undefined') {
                    tokens[sequence] = 0
                }

                ++tokens[sequence]
            })
        })

        return tokens
    }

    /**
     * Convert a tokenized object into a new object with all keys (terms)
     * translated to their index in the vocabulary (adding all terms to
     * the vocabulary that do not already exist)
     *
     * @param {Object} tokens
     * @return {Object}
     */
    vectorize(tokens) {
        if (!(tokens instanceof Object) || tokens.constructor !== Object) {
            throw new Error('tokens must be an object literal')
        }

        /* istanbul ignore next */
        if (this._model.vocabulary === false) {
            throw new Error('Cannot vectorize tokens when vocabulary is false')
        }

        let vector = {}

        Object.keys(tokens).forEach(token => {
            let vocabularyIndex = this._model.vocabulary.indexOf(token)

            if (vocabularyIndex === -1) {
                this._model.vocabulary.add(token)

                vocabularyIndex = this._model.vocabulary.size - 1
            }

            vector[vocabularyIndex] = tokens[token]
        })

        return vector
    }

    /**
     * Return the cosine similarity between two vectors
     *
     * @param {Object} v1
     * @param {Object} v2
     * @return {float}
     */
    cosineSimilarity(v1, v2) {
        if (!(v1 instanceof Object) || v1.constructor !== Object) {
            throw new Error('v1 must be an object literal')
        }
        if (!(v2 instanceof Object) || v2.constructor !== Object) {
            throw new Error('v2 must be an object literal')
        }

        let prod = 0.0
        let v1Norm = 0.0

        Object.keys(v1).forEach(i => {
            let xi = v1[i]

            if (typeof v2[i] !== 'undefined') {
                prod += xi * v2[i]
            }

            v1Norm += xi * xi
        })

        v1Norm = Math.sqrt(v1Norm)

        if (v1Norm === 0) {
            return 0
        }

        let v2Norm = 0.0

        Object.keys(v2).forEach(i => {
            let xi = v2[i]

            v2Norm += xi * xi
        })

        v2Norm = Math.sqrt(v2Norm)

        if (v2Norm === 0) {
            return 0
        }

        return prod / (v1Norm * v2Norm)
    }
}

export default Classifier
