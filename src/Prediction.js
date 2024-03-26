export class Prediction {
	/**
	 * @param {{ label?: string, confidence?: number }} prediction
	 */
	constructor(prediction = {}) {
		if (Object.getPrototypeOf(prediction) !== Object.prototype) {
			throw new Error('prediction must be an object literal')
		}

		/**
		 * @type {string}
		 * @private
		 */
		this._label = prediction.label ?? ''

		/**
		 * @type {number}
		 * @private
		 */
		this._confidence = prediction.confidence ?? 0
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
