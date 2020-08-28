import Vocabulary from './vocabulary'

/**
 * @param {Object} [config]
 * @param {int} [config.nGramMin=1] - Minimum n-gram size
 * @param {int} [config.nGramMax=1] - Maximum n-gram size
 * @param {(Array|Set|false)} [config.vocabulary=[]] - Terms mapped to indexes in the model data entries, set to false to store terms directly in the data entries
 * @param {Object} [config.data={}] - Key-value store containing all training data
 * @constructor
 */
class Model {
    constructor(config = {}) {
        if (!(config instanceof Object) || config.constructor !== Object) {
            throw new Error('config must be an object literal')
        }

        config = {
            nGramMin: 1,
            nGramMax: 1,
            vocabulary: [],
            data: {},
            ...config
        }

        if (config.nGramMin !== parseInt(config.nGramMin, 10)) {
            throw new Error('Config value nGramMin must be an integer')
        }

        if (config.nGramMax !== parseInt(config.nGramMax, 10)) {
            throw new Error('Config value nGramMax must be an integer')
        }

        if (config.nGramMin < 1) {
            throw new Error('Config value nGramMin must be at least 1')
        }

        if (config.nGramMax < 1) {
            throw new Error('Config value nGramMax must be at least 1')
        }

        if (config.nGramMax < config.nGramMin) {
            throw new Error('Invalid nGramMin/nGramMax combination in config')
        }

        if (config.vocabulary !== false && !(config.vocabulary instanceof Vocabulary)) {
            config.vocabulary = new Vocabulary(config.vocabulary)
        }

        if (!(config.data instanceof Object) || config.data.constructor !== Object) {
            throw new Error('Config value data must be an object literal')
        }

        this._nGramMin = config.nGramMin
        this._nGramMax = config.nGramMax
        this._vocabulary = config.vocabulary
        this._data = {...config.data}
    }

    /**
     * Minimum n-gram size
     *
     * @type {int}
     */
    get nGramMin() {
        return this._nGramMin
    }

    set nGramMin(size) {
        if (size !== parseInt(size, 10)) {
            throw new Error('nGramMin must be an integer')
        }

        this._nGramMin = size
    }

    /**
     * Maximum n-gram size
     *
     * @type {int}
     */
    get nGramMax() {
        return this._nGramMax
    }

    set nGramMax(size) {
        if (size !== parseInt(size, 10)) {
            throw new Error('nGramMax must be an integer')
        }

        this._nGramMax = size
    }

    /**
     * Vocabulary instance 
     *
     * @type {(Vocabulary|false)}
     */
    get vocabulary() {
        return this._vocabulary
    }

    set vocabulary(vocabulary) {
        if (vocabulary !== false && !(vocabulary instanceof Vocabulary)) {
            vocabulary = new Vocabulary(vocabulary)
        }

        this._vocabulary = vocabulary
    }

    /**
     * Model data
     *
     * @type {Object}
     */
    get data() {
        return this._data
    }

    set data(data) {
        if (!(data instanceof Object) || data.constructor !== Object) {
            throw new Error('data must be an object literal')
        }

        this._data = {...data}
    }

    /**
     * Return the model in its current state an an object literal, including the
     * configured n-gram min/max values, the vocabulary as an array (if any,
     * otherwise false), and an object literal with all the training data
     *
     * @return {Object}
     */
    serialize() {
        return {
            nGramMin: this._nGramMin,
            nGramMax: this._nGramMax,
            vocabulary: Array.from(this._vocabulary.terms),
            data: this._data
        }
    }
}

export default Model
