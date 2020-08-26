import { assert, expect } from 'chai'
import Prediction from '../src/prediction'

describe('Prediction', () => {
    describe('constructor', () => {
        it('should throw an error if prediction is not an object literal', () => {
            expect(() => new Prediction([])).to.throw(Error)
        })
    })

    describe('label', () => {
        it('should throw an error if label is not a string', () => {
            const prediction = new Prediction()

            expect(() => {
                prediction.label = []
            }).to.throw(Error)
        })

        it('should return a string', () => {
            const prediction = new Prediction()

            expect(prediction.label).to.be.a('string')
        })

        it('should return the defined prediction label', () => {
            const prediction = new Prediction({
                label: 'test'
            })

            expect(prediction.label).to.equal('test')
        })

        it('should set the prediction label', () => {
            const prediction = new Prediction()

            prediction.label = 'test'

            expect(prediction.label).to.equal('test')
        })
    })

    describe('confidence', () => {
        it('should throw an error if confidence is not a number', () => {
            const prediction = new Prediction()

            expect(() => {
                prediction.confidence = 'test'
            }).to.throw(Error)
        })

        it('should return a number', () => {
            const prediction = new Prediction()

            expect(prediction.confidence).to.be.a('number')
        })

        it('should return the defined prediction confidence', () => {
            const prediction = new Prediction({
                confidence: 0.5
            })

            expect(prediction.confidence).to.equal(0.5)
        })

        it('should set the prediction confidence', () => {
            const prediction = new Prediction()

            prediction.confidence = 1

            expect(prediction.confidence).to.equal(1)
        })
    })
})
