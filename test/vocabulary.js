import { assert, expect } from 'chai'
import Vocabulary from '../src/vocabulary'

describe('Vocabulary', () => {
    describe('constructor', () => {
        it('should throw an error if terms is not an array or set', () => {
            expect(() => new Vocabulary({})).to.throw(Error)
        })
    })

    describe('size', () => {
        it('should return a number', () => {
            const vocabulary = new Vocabulary()

            expect(vocabulary.size).to.be.a('number')
        })

        it('should return the vocabulary size', () => {
            const vocabulary = new Vocabulary([ 'hello' ])

            expect(vocabulary.size).to.equal(1)
        })
    })

    describe('terms', () => {
        it('should return a set instance', () => {
            const vocabulary = new Vocabulary()

            assert.instanceOf(vocabulary.terms, Set)
        })

        it('should return the vocabulary terms', () => {
            const vocabulary = new Vocabulary(['hello'])

            expect(Array.from(vocabulary.terms)).to.eql(['hello'])
        })

        it('should set the vocabulary terms from an array', () => {
            const vocabulary = new Vocabulary()

            vocabulary.terms = ['hello', 'world']

            expect(Array.from(vocabulary.terms)).to.eql(['hello', 'world'])
        })

        it('should set the vocabulary terms from a set', () => {
            const vocabulary = new Vocabulary()

            vocabulary.terms = new Set(['hello', 'world'])

            expect(Array.from(vocabulary.terms)).to.eql(['hello', 'world'])
        })

        it('should throw an error if terms is not an array or set', () => {
            const vocabulary = new Vocabulary()

            expect(() => {
                vocabulary.terms = {}
            }).to.throw(Error)
        })
    })

    describe('add', () => {
        it('should throw an error if terms is not a string, array or set', () => {
            const vocabulary = new Vocabulary()

            expect(() => vocabulary.add({})).to.throw(Error)
        })

        it('should add a term to the vocabulary from a string', () => {
            const vocabulary = new Vocabulary()

            vocabulary.add('test')

            expect(Array.from(vocabulary.terms)).to.eql(['test'])
        })

        it('should add terms to the vocabulary from an array', () => {
            const vocabulary = new Vocabulary()

            vocabulary.add(['hello', 'world'])

            expect(Array.from(vocabulary.terms)).to.eql(['hello', 'world'])
        })
        
        it('should add terms to the vocabulary from a set', () => {
            const vocabulary = new Vocabulary()

            vocabulary.add(new Set(['hello', 'world']))

            expect(Array.from(vocabulary.terms)).to.eql(['hello', 'world'])
        })

        it('should return vocabulary instance', () => {
            const vocabulary = new Vocabulary()

            assert.instanceOf(vocabulary.add('test'), Vocabulary)
        })
    })

    describe('remove', () => {
        it('should throw an error if terms is not a string, array or set', () => {
            const vocabulary = new Vocabulary()

            expect(() => vocabulary.remove({})).to.throw(Error)
        })

        it('should remove a term to the vocabulary when called with a string', () => {
            const vocabulary = new Vocabulary(['test'])

            vocabulary.remove('test')

            expect(Array.from(vocabulary.terms)).to.eql([])
        })

        it('should remove terms from the vocabulary when called with an array', () => {
            const vocabulary = new Vocabulary(['hello', 'world'])

            vocabulary.remove(['world'])

            expect(Array.from(vocabulary.terms)).to.eql(['hello'])
        })

        it('should remove terms from the vocabulary when called with a set', () => {
            const vocabulary = new Vocabulary(['hello', 'world'])

            vocabulary.remove(new Set(['world']))

            expect(Array.from(vocabulary.terms)).to.eql(['hello'])
        })

        it('should return a vocabulary instance', () => {
            const vocabulary = new Vocabulary(['test'])

            assert.instanceOf(vocabulary.remove('test'), Vocabulary)
        })
    })

    describe('has', () => {
        it('should return a boolean', () => {
            const vocabulary = new Vocabulary()

            assert.isBoolean(vocabulary.has('test'))
        })

        it('should return whether a term exists in the vocabulary', () => {
            const vocabulary = new Vocabulary(['test'])

            assert.isTrue(vocabulary.has('test'))
        })
    })

    describe('indexOf', () => {
        it('should return the index of an existing vocabulary term', () => {
            const vocabulary = new Vocabulary(['test'])

            expect(vocabulary.indexOf('test')).to.equal(0)
        })

        it('should return -1 for non-existing vocabulary terms', () => {
            const vocabulary = new Vocabulary()

            expect(vocabulary.indexOf('test')).to.equal(-1)
        })
    })
})
