import XRegExp from "xregexp";
import { Model, type ModelConfig } from "./Model.js";
import { Prediction } from "./Prediction.js";
import { Vocabulary } from "./Vocabulary.js";

export class Classifier {
	private _model: Model;

	/**
	 * @param {Model | Partial<import('./Model.js').ModelConfig>} model
	 */
	constructor(model: Model | Partial<ModelConfig> = {}) {
		if (!(model instanceof Model)) {
			model = new Model(model);
		}

		/**
		 * @type {Model}
		 * @private
		 */
		this._model = model;
	}

	/**
	 * Model instance
	 *
	 * @type {Model}
	 */
	get model() {
		return this._model;
	}

	set model(model) {
		if (!(model instanceof Model)) {
			model = new Model(model);
		}

		this._model = model;
	}

	/**
	 * Train the current model using an input string (or array of strings) and a corresponding label
	 *
	 * @param {(string|string[])} input - String, or an array of strings
	 * @param {string} label - Corresponding label
	 * @return {this}
	 */
	train(input: string | string[], label: string): this {
		if (typeof input !== "string" && !Array.isArray(input)) {
			throw new Error("input must be either a string or Array");
		}

		if (typeof label !== "string") {
			throw new Error("label must be a string");
		}

		// If input isn't an array, convert to a single item array
		if (!Array.isArray(input)) {
			input = [input];
		}

		for (const string of input) {
			// Convert the string to a tokenized object
			let tokens = this.tokenize(string);

			if (this._model.vocabulary !== false) {
				// If we're using a vocabulary, convert the tokens to a vector where all
				// indexes reference vocabulary terms
				const { vector, vocabulary } = this.vectorize(tokens);

				// Overwrite the tokens object with our new vectorized object
				tokens = vector;

				// Update the model vocabulary
				this._model.vocabulary = vocabulary;
			}

			// Set up an empty entry for the label if it does not exist
			if (!Object.prototype.hasOwnProperty.call(this._model.data, label)) {
				this._model.data[label] = {};
			}

			// Add all occurrences to our model entry
			for (const index of Object.keys(tokens)) {
				const occurrences = tokens[index];

				if (
					!Object.prototype.hasOwnProperty.call(this._model.data[label], index)
				) {
					this._model.data[label][index] = 0;
				}

				this._model.data[label][index] += occurrences;
			}
		}

		return this;
	}

	/**
	 * Return an array of one or more Prediction instances
	 *
	 * @param {string} input
	 * @return {Array<Prediction>}
	 */
	predict(
		input: string,
		maxMatches = 1,
		minimumConfidence = 0.2
	): Array<Prediction> {
		if (typeof input !== "string") {
			throw new Error("input must be a string");
		}

		if (!["number", "undefined"].includes(typeof maxMatches)) {
			throw new Error("maxMatches must be either a number or undefined");
		}

		if (!["number", "undefined"].includes(typeof minimumConfidence)) {
			throw new Error("minimumConfidence must be either a number or undefined");
		}

		if (minimumConfidence < 0) {
			throw new Error("minimumConfidence can not be lower than 0");
		}

		if (minimumConfidence > 1) {
			throw new Error("minimumConfidence can not be higher than 1");
		}

		// Convert the string to a tokenized object
		let tokens = this.tokenize(input);

		if (this._model.vocabulary !== false) {
			// If we're using a vocabulary, convert the tokens to a vector where all
			// indexes reference vocabulary terms
			const { vector } = this.vectorize(tokens);

			// Overwrite the tokens object with our new vectorized object
			tokens = vector;
		}

		/**
		 * @type {Prediction[]}
		 */
		const predictions: Prediction[] = [];

		for (const label of Object.keys(this._model.data)) {
			const entry = this._model.data[label];
			const confidence = this.cosineSimilarity(tokens, entry);

			if (confidence >= minimumConfidence) {
				predictions.push(
					new Prediction({
						label,
						confidence,
					})
				);
			}
		}

		/* istanbul ignore next */
		predictions.sort((a, b) => {
			if (a.confidence === b.confidence) {
				return 0;
			}

			return a.confidence > b.confidence ? -1 : 1;
		});

		return predictions.slice(0, Math.min(predictions.length, maxMatches));
	}

	/**
	 * Split a string into an array of lowercase words, with all non-letter characters removed
	 *
	 * @param {string} input
	 * @return {string[]}
	 */
	splitWords(input: string): string[] {
		if (typeof input !== "string") {
			throw new Error("input must be a string");
		}

		// Remove all apostrophes and dashes to keep words intact
		input = input.replace(/'|´|’|-/g, "");

		// Lowercase all letters and replace all non-letter characters with a space
		input = XRegExp.replace(
			input.toLocaleLowerCase(),
			XRegExp("\\P{L}+", "g"),
			" "
		).trim();

		return input.split(" ");
	}

	/**
	 * Create an object literal of unique tokens (n-grams) as keys, and their
	 * respective occurrences as values based on an input string, or array of words
	 *
	 * @param {(string|string[])} input
	 * @return {Record<string, number>}
	 */
	tokenize(input: string | string[]): Record<string, number> {
		const words = typeof input === "string" ? this.splitWords(input) : input;

		if (!Array.isArray(words)) {
			throw new Error("input must be either a string or Array");
		}

		if (this._model.nGramMax < this._model.nGramMin) {
			throw new Error("Invalid nGramMin/nGramMax combination in model config");
		}

		/**
		 * @type {Record<string, number>}
		 */
		const tokens: Record<string, number> = {};

		// Generate a list of n-grams along with their respective occurrences
		// based on the models configured min/max values
		words.forEach((word, index) => {
			let sequence = "";

			// biome-ignore lint/complexity/noForEach: Complications when using for of loop
			words.slice(index).forEach((nextWord) => {
				sequence += sequence ? ` ${nextWord}` : nextWord;
				const tokenCount = sequence.split(" ").length;

				if (
					tokenCount < this._model.nGramMin ||
					tokenCount > this._model.nGramMax
				) {
					return;
				}

				if (!Object.prototype.hasOwnProperty.call(tokens, sequence)) {
					tokens[sequence] = 0;
				}

				++tokens[sequence];
			});
		});

		return tokens;
	}

	/**
	 * Convert a tokenized object into a new object with all keys (terms)
	 * translated to their index in the returned vocabulary (which is also
	 * returned along with the object, with any new terms added to the end)
	 *
	 * @param {Record<string, number>} tokens
	 * @return {{vector: Record<string, number>, vocabulary: Vocabulary}}
	 */
	vectorize(tokens: Record<string, number>): {
		vector: Record<string, number>;
		vocabulary: Vocabulary;
	} {
		if (Object.getPrototypeOf(tokens) !== Object.prototype) {
			throw new Error("tokens must be an object literal");
		}

		/* istanbul ignore next */
		if (this._model.vocabulary === false) {
			throw new Error("Cannot vectorize tokens when vocabulary is false");
		}

		/**
		 * @type {Record<string, number>}
		 */
		const vector: Record<string, number> = {};
		const vocabulary = new Vocabulary(this._model.vocabulary.terms);

		for (const token of Object.keys(tokens)) {
			let vocabularyIndex = vocabulary.indexOf(token);

			if (vocabularyIndex === -1) {
				vocabulary.add(token);

				vocabularyIndex = vocabulary.size - 1;
			}

			vector[vocabularyIndex] = tokens[token];
		}

		return {
			vector,
			vocabulary,
		};
	}

	/**
	 * Return the cosine similarity between two vectors
	 *
	 * @param {Record<string, number>} v1
	 * @param {Record<string, number>} v2
	 * @return {number}
	 */
	cosineSimilarity(
		v1: Record<string, number>,
		v2: Record<string, number>
	): number {
		if (Object.getPrototypeOf(v1) !== Object.prototype) {
			throw new Error("v1 must be an object literal");
		}
		if (Object.getPrototypeOf(v2) !== Object.prototype) {
			throw new Error("v2 must be an object literal");
		}

		let prod = 0.0;
		let v1Norm = 0.0;

		for (const i of Object.keys(v1)) {
			const xi = v1[i];

			if (Object.prototype.hasOwnProperty.call(v2, i)) {
				prod += xi * v2[i];
			}

			v1Norm += xi * xi;
		}

		v1Norm = Math.sqrt(v1Norm);

		if (v1Norm === 0) {
			return 0;
		}

		let v2Norm = 0.0;

		for (const i of Object.keys(v2)) {
			const xi = v2[i];
			v2Norm += xi * xi;
		}

		v2Norm = Math.sqrt(v2Norm);

		if (v2Norm === 0) {
			return 0;
		}

		return prod / (v1Norm * v2Norm);
	}
}
