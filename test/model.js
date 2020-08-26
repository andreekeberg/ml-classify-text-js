import { assert, expect } from 'chai'
import Model from '../src/model'
import Vocabulary from '../src/vocabulary'

describe('Model', () => {
    describe('constructor', () => {
        it('should throw an error if config is not an object literal', () => {
            expect(() => new Model([])).to.throw(Error)
        })

        it('should throw an error if config option nGramMin is not a number', () => {
            expect(() => new Model({
                nGramMin: ''
            })).to.throw(Error)
        })

        it('should throw an error if config option nGramMax is not a number', () => {
            expect(() => new Model({
                nGramMax: ''
            })).to.throw(Error)
        })

        it('should throw an error if config option nGramMin is less than 1', () => {
            expect(() => new Model({
                nGramMin: 0
            })).to.throw(Error)
        })

        it('should throw an error if config option nGramMax is less than 1', () => {
            expect(() => new Model({
                nGramMax: 0
            })).to.throw(Error)
        })

        it('should throw an error if config option nGramMax is less than nGramMin', () => {
            expect(() => new Model({
                nGramMin: 2,
                nGramMax: 1
            })).to.throw(Error)
        })

        it('should throw an error if minimumConfidence is not a number', () => {
            expect(() => new Model({
                minimumConfidence: 'test'
            })).to.throw(Error)
        })

        it('should throw an error if minimumConfidence is lower than 0', () => {
            expect(() => new Model({
                minimumConfidence: -1
            })).to.throw(Error)
        })

        it('should throw an error if minimumConfidence is higher than 1', () => {
            expect(() => new Model({
                minimumConfidence: 2
            })).to.throw(Error)
        })

        it('should throw an error if data is not an object literal', () => {
            expect(() => new Model({
                data: []
            })).to.throw(Error)
        })
    })

    describe('nGramMin', () => {
        it('should return a number', () => {
            const model = new Model()

            expect(model.nGramMin).to.be.a('number')
        })

        it('should return the current nGramMin value', () => {
            const model = new Model({
                nGramMin: 3,
                nGramMax: 4
            })

            expect(model.nGramMin).to.equal(3)
        })
        
        it('should set the nGramMin value', () => {
            const model = new Model()

            model.nGramMin = 2

            expect(model.nGramMin).to.equal(2)
        })

        it('should throw an error if size is not an integer', () => {
            const model = new Model()
            
            expect(() => {
                model.nGramMin = 1.1
            }).to.throw(Error)
        })
    })

    describe('nGramMax', () => {
        it('should return a number', () => {
            const model = new Model()

            expect(model.nGramMax).to.be.a('number')
        })

        it('should return the current nGramMax value', () => {
            const model = new Model({
                nGramMax: 2
            })

            expect(model.nGramMax).to.equal(2)
        })

        it('should set the nGramMax value', () => {
            const model = new Model()

            model.nGramMax = 3

            expect(model.nGramMax).to.equal(3)
        })

        it('should throw an error if size is not an integer', () => {
            const model = new Model()

            expect(() => {
                model.nGramMax = 1.1
            }).to.throw(Error)
        })
    })

    describe('minimumConfidence', () => {
        it('should return a number', () => {
            const model = new Model()

            expect(model.minimumConfidence).to.be.a('number')
        })

        it('should return the current minimumConfidence value', () => {
            const model = new Model({
                minimumConfidence: 0.5
            })

            expect(model.minimumConfidence).to.equal(0.5)
        })

        it('should set the minimumConfidence value', () => {
            const model = new Model()

            model.minimumConfidence = 0.1

            expect(model.minimumConfidence).to.equal(0.1)
        })

        it('should throw an error if confidence is not a number', () => {
            const model = new Model()

            expect(() => {
                model.minimumConfidence = 'test'
            }).to.throw(Error)
        })

        it('should throw an error if confidence is lower than 0', () => {
            const model = new Model()

            expect(() => {
                model.minimumConfidence = -1
            }).to.throw(Error)
        })

        it('should throw an error if confidence is higher than 1', () => {
            const model = new Model()

            expect(() => {
                model.minimumConfidence = 2
            }).to.throw(Error)
        })
    })

    describe('vocabulary', () => {
        it('should return a vocabulary instance', () => {
            const model = new Model()

            assert.instanceOf(model.vocabulary, Vocabulary)
        })

        it('should return false when vocabulary is configured to false', () => {
            const model = new Model({
                vocabulary: false
            })

            expect(model.vocabulary).to.equal(false)
        })

        it('should set the vocabulary value when passing an array', () => {
            const model = new Model()

            model.vocabulary = ['hello', 'world']

            expect(Array.from(model.vocabulary.terms)).to.eql(['hello', 'world'])
        })

        it('should set the vocabulary value when passing false', () => {
            const model = new Model()

            model.vocabulary = false

            assert.isFalse(model.vocabulary)
        }) 
    })

    describe('data', () => {
        it('should return an object literal', () => {
            const model = new Model()

            expect(model.data).to.eql({})
        })

        it('should set the model data', () => {
            const model = new Model()

            model.data = {
                test: { 0: 1 }
            }

            expect(model.data).to.eql({
                test: { 0: 1 }
            })
        })

        it('should throw an error if data is not an object literal', () => {
            const model = new Model()

            expect(() => {
                model.data = []
            }).to.throw(Error)
        })
    })

    describe('serialize', () => {
        it('should return an object literal created from the current model', () => {
            const model = new Model()

            expect(model.serialize()).to.eql({
                nGramMin: 1,
                nGramMax: 1,
                minimumConfidence: 0.2,
                vocabulary: [],
                data: {}
            })
        })
    })
})
