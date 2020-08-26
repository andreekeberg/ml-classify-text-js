/**
 * @param {Object} prediction
 * @constructor
 * @hideconstructor
 */
class Prediction {
    constructor(prediction = {}) {
        if (!(prediction instanceof Object) || prediction.constructor !== Object) {
            throw new Error('prediction must be an object literal')
        }

        prediction = {
            label: '',
            confidence: 0,
            ...prediction
        }

        this._label = prediction.label
        this._confidence = prediction.confidence
    }

    /**
     * Label of the prediction
     *
     * @type {string}
     */
    get label() {
        return this._label
    }

    set label(label) {
        if (typeof label !== 'string') {
            throw new Error('label must be a string')
        }

        this._label = label
    }

    /**
     * Confidence of the prediction
     *
     * @type {number}
     */
    get confidence() {
        return this._confidence
    }

    set confidence(confidence) {
        if (typeof confidence !== 'number') {
            throw new Error('confidence must be a number')
        }

        this._confidence = confidence
    }
}

export default Prediction
