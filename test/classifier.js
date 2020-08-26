import { assert, expect } from 'chai'
import Classifier from '../src/classifier'
import Model from '../src/model'

describe('Classifier', () => {
    describe('constructor', () => {
        it('should set the model when passed a model instance', () => {
            const classifier = new Classifier(new Model({
                nGramMax: 4
            }))

            expect(classifier.model.nGramMax).to.equal(4)
        })

        it('should set the model when passed an object literal', () => {
            const classifier = new Classifier({
                nGramMax: 5
            })

            expect(classifier.model.nGramMax).to.equal(5)
        })
    })

    describe('model', () => {
        it('should return a model instance', () => {
            let classifier = new Classifier()

            assert.instanceOf(classifier.model, Model)
        })

        it('should set the current model when passed a model instance', () => {
            let classifier = new Classifier()

            classifier.model = new Model({
                nGramMax: 3
            })

            expect(classifier.model.nGramMax).to.equal(3)
        })

        it('should set the current model to a new model instance when passed an object literal', () => {
            let classifier = new Classifier()

            classifier.model = {}

            assert.instanceOf(classifier.model, Model)
        })
    })

    describe('splitWords', () => {
        it('should throw an error if input is not a string', () => {
            const classifier = new Classifier()

            expect(() => classifier.splitWords(1)).to.throw(Error)
        })

        it('should split a string into an array of words', () => {
            const classifier = new Classifier()

            expect(classifier.splitWords('Hello world!')).to.eql(
                ['hello', 'world']
            )
        })
    })

    describe('tokenize', () => {
        it('should throw an error if input is neither a string or array', () => {
            const classifier = new Classifier()

            expect(() => classifier.tokenize({})).to.throw(Error)
        })

        it('should throw an error if nGramMax is less than nGramMin in model config', () => {
            const classifier = new Classifier()

            classifier.model.nGramMin = 2
            
            expect(() => classifier.tokenize('Hello world!')).to.throw(Error)
        })

        it('should return an object literal of tokens and their occurrences from a string', () => {
            const classifier = new Classifier()

            expect(classifier.tokenize('Hello world!')).to.eql({
                hello: 1,
                world: 1
            })
        })

        it('should return an object literal of tokens and their occurrences from a string', () => {
            const classifier = new Classifier()

            expect(classifier.tokenize('Hello world!')).to.eql({
                hello: 1,
                world: 1
            })
        })

        it('should return an object literal of tokens and their occurrences from a array', () => {
            const classifier = new Classifier()

            expect(classifier.tokenize(['hello', 'world'])).to.eql({
                hello: 1,
                world: 1
            })
        })

        it('should return an object literal of bigrams when nGramMin/nGramMax is 2', () => {
            const classifier = new Classifier({
                nGramMin: 2,
                nGramMax: 2
            })

            expect(classifier.tokenize('Hello world!')).to.eql({
                'hello world': 1
            })
        })

        it('should return an object literal of unigrams and bigrams when nGramMin/nGramMax is 1/2', () => {
            const classifier = new Classifier({
                nGramMin: 1,
                nGramMax: 2
            })

            expect(classifier.tokenize('Hello world!')).to.eql({
                'hello': 1,
                'hello world': 1,
                'world': 1
            })
        })

        it('should increment the occurrence of the duplicate tokens', () => {
            const classifier = new Classifier()

            expect(classifier.tokenize('Hello hello!')).to.eql({
                'hello': 2
            })
        })
    })

    describe('vectorize', () => {
        it('should throw an error if input is not an object literal', () => {
            const classifier = new Classifier()

            expect(() => classifier.vectorize([])).to.throw(Error)
        })

        it('should throw an error if vocabulary config option is set to false', () => {
            const classifier = new Classifier({
                vocabulary: false
            })

            expect(() => classifier.vectorize('hello')).to.throw(Error)
        })

        it('should convert key to its corresponding vocabulary term index', () => {
            const classifier = new Classifier()
            const tokens = classifier.tokenize('Hello')

            expect(classifier.vectorize(tokens)).to.eql({ 0: 1 })
        })

        it('should use existing term index when token is already in vocabulary', () => {
            const classifier = new Classifier({
                vocabulary: ['hello', 'world']
            })

            const tokens = classifier.tokenize('world')

            expect(classifier.vectorize(tokens)).to.eql({ 1: 1 })
        })

        it('should add new tokens to the vocabulary', () => {
            const classifier = new Classifier()

            const tokens = classifier.tokenize('Hello world')

            classifier.vectorize(tokens)

            const terms = classifier.model.vocabulary.terms

            expect(Array.from(terms)).to.eql(['hello', 'world'])
        })
    })

    describe('train', () => {
        it('should throw an error if input is not a string or array', () => {
            const classifier = new Classifier()

            expect(() => classifier.train({}, 'test')).to.throw(Error)
        })

        it('should throw an error if label is not a string', () => {
            const classifier = new Classifier()

            expect(() => classifier.train('test', [])).to.throw(Error)
        })
        
        it('should add tokens to the vocabulary (if not configured to false)', () => {
            const classifier = new Classifier()

            classifier.train('hello world', 'test')

            const vocabulary = classifier.model.vocabulary

            expect(vocabulary.size).to.equal(2)
        })

        it('should add tokens (and their occurrences) to the model from a string', () => {
            const classifier = new Classifier()

            classifier.train('hello world', 'test')

            const model = classifier.model

            expect(model.data).to.eql({
                test: { 0: 1, 1: 1 }
            })
        })

        it('should add tokens (and their occurrences) to the model from an array of strings', () => {
            const classifier = new Classifier()

            classifier.train([
                'hello world',
                'foo', 'bar'
            ], 'test')

            const model = classifier.model

            expect(model.data).to.eql({
                test: { 0: 1, 1: 1, 2: 1, 3: 1 }
            })
        })

        it('should increment the occurrence of an existing vocabulary term', () => {
            const classifier = new Classifier()

            classifier.train([
                'hello world',
                'foo', 'hello'
            ], 'test')

            const model = classifier.model

            expect(model.data).to.eql({
                test: { 0: 2, 1: 1, 2: 1 }
            })
        })

        it('should return classifier instance', () => {
            const classifier = new Classifier()

            expect(classifier.train('hello world', 'test')).to.equal(classifier)
        })
    })
    
    describe('cosineSimilarity', () => {
        it('should throw an error if v1 is not an object literal', () => {
            const classifier = new Classifier()

            expect(() => classifier.cosineSimilarity(false, {})).to.throw(Error)
        })

        it('should throw an error if v2 is not an object literal', () => {
            const classifier = new Classifier()

            expect(() => classifier.cosineSimilarity({}, false)).to.throw(Error)
        })

        it('should return 1 on identical object literals', () => {
            const classifier = new Classifier()

            expect(classifier.cosineSimilarity({
                0: 1
            }, {
                0: 1
            })).to.equal(1)
        })

        it('should return 0 on object literals with no similarity', () => {
            const classifier = new Classifier()

            expect(classifier.cosineSimilarity({
                0: 1
            }, {
                1: 1
            })).to.equal(0)
        })

        it('should return > 0 on similar object literals', () => {
            const classifier = new Classifier()

            assert.isAbove(classifier.cosineSimilarity({
                0: 1,
                1: 1
            }, {
                0: 1,
                2: 1
            }), 0)
        })

        it('should return 0 when sum of v1 is 0', () => {
            const classifier = new Classifier()

            expect(classifier.cosineSimilarity({
                0: 0
            }, {
                0: 1
            })).to.equal(0)
        })

        it('should return 0 when sum of v2 is 0', () => {
            const classifier = new Classifier()

            expect(classifier.cosineSimilarity({
                0: 1
            }, {
                0: 0
            })).to.equal(0)
        })
    })

    describe('predict', () => {
        it('should throw an error if input is not a string', () => {
            const classifier = new Classifier()

            expect(() => classifier.predict([])).to.throw(Error)
        })

        it('should return an array', () => {
            const classifier = new Classifier()

            assert.typeOf(classifier.predict('test'), 'array')
        })

        it('should return one prediction when trained with a sample', () => {
            const classifier = new Classifier()

            classifier.train('hello world', 'test')

            assert.lengthOf(classifier.predict('hello world'), 1)
        })
    })
})
