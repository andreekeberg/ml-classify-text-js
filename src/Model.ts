import { Vocabulary } from './Vocabulary.js';

export type ModelData = Record<string, Record<string, number>>;

export type ModelConfig = {
	nGramMin: number;
	nGramMax: number;
	vocabulary: string[] | Set<string> | false;
	data: ModelData;
};

export class Model {
	private _nGramMin: number;
	private _nGramMax: number;
	private _data: { [x: string]: Record<string, number> };
	private _vocabulary: Vocabulary | false;

	/**
	 * @param {Partial<ModelConfig>} config
	 */
	constructor(config: Partial<ModelConfig> = {}) {
		if (Object.getPrototypeOf(config) !== Object.prototype) {
			throw new Error('config must be an object literal');
		}

		config = {
			nGramMin: 1,
			nGramMax: 1,
			vocabulary: [],
			data: {},
			...config,
		};

		if (config.nGramMin !== Number.parseInt(String(config.nGramMin), 10)) {
			throw new Error('Config value nGramMin must be an integer');
		}

		if (config.nGramMax !== Number.parseInt(String(config.nGramMax), 10)) {
			throw new Error('Config value nGramMax must be an integer');
		}

		if (config.nGramMin < 1) {
			throw new Error('Config value nGramMin must be at least 1');
		}

		if (config.nGramMax < 1) {
			throw new Error('Config value nGramMax must be at least 1');
		}

		if (config.nGramMax < config.nGramMin) {
			throw new Error('Invalid nGramMin/nGramMax combination in config');
		}

		if (
			config.vocabulary !== false &&
			!(config.vocabulary instanceof Vocabulary)
		) {
			/**
			 * @type {Vocabulary|false}
			 * @private
			 */
			this._vocabulary = new Vocabulary(config.vocabulary);
		} else {
			/**
			 * @type {Vocabulary|false}
			 * @private
			 */
			this._vocabulary = config.vocabulary;
		}

		if (Object.getPrototypeOf(config.data) !== Object.prototype) {
			throw new Error('Config value data must be an object literal');
		}

		/**
		 * @type {number}
		 * @private
		 */
		this._nGramMin = config.nGramMin;

		/**
		 * @type {number}
		 * @private
		 */
		this._nGramMax = config.nGramMax;

		/**
		 * @type {ModelData}
		 * @private
		 */
		this._data = { ...config.data };
	}

	/**
	 * Minimum n-gram size
	 *
	 * @type {number}
	 */
	get nGramMin() {
		return this._nGramMin;
	}

	set nGramMin(size) {
		if (size !== Number.parseInt(String(size), 10)) {
			throw new Error('nGramMin must be an integer');
		}

		this._nGramMin = size;
	}

	/**
	 * Maximum n-gram size
	 *
	 * @type {number}
	 */
	get nGramMax() {
		return this._nGramMax;
	}

	set nGramMax(size) {
		if (size !== Number.parseInt(String(size), 10)) {
			throw new Error('nGramMax must be an integer');
		}

		this._nGramMax = size;
	}

	/**
	 * Vocabulary instance
	 *
	 * @type {(Vocabulary|false)}
	 */
	get vocabulary() {
		return this._vocabulary;
	}

	set vocabulary(v: Vocabulary | false) {
		if (v !== false && !(v instanceof Vocabulary)) {
			v = new Vocabulary(v);
		}

		this._vocabulary = v;
	}

	/**
	 * Model data
	 *
	 * @type {ModelData}
	 */
	get data() {
		return this._data;
	}

	set data(data) {
		if (!(data instanceof Object) || data.constructor !== Object) {
			throw new Error('data must be an object literal');
		}

		this._data = { ...data };
	}

	/**
	 * Return the model in its current state an an object literal, including the
	 * configured n-gram min/max values, the vocabulary as an array (if any,
	 * otherwise false), and an object literal with all the training data
	 *
	 * @return {ModelConfig}
	 */
	serialize() {
		return {
			nGramMin: this._nGramMin,
			nGramMax: this._nGramMax,
			vocabulary: this._vocabulary ? Array.from(this._vocabulary.terms) : false,
			data: this._data,
		};
	}
}
