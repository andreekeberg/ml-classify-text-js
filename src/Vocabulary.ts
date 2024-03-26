export class Vocabulary {
	private _terms: Set<string>;

	/**
	 * @param {Array<string>|Set<string>} terms
	 */
	constructor(terms: Array<string> | Set<string> = []) {
		if (!Array.isArray(terms) && !(terms instanceof Set)) {
			throw new Error("terms must be either an Array or a Set");
		}

		/**
		 * @type {Set<string>}
		 * @private
		 */
		this._terms = new Set(terms);
	}

	/**
	 * Vocabulary size
	 *
	 * @type {number}
	 */
	get size() {
		return this._terms.size;
	}

	/**
	 * Vocabulary terms
	 *
	 * @type {Set<string>}
	 */
	get terms() {
		return this._terms;
	}

	set terms(terms: Set<string> | string[]) {
		if (!Array.isArray(terms) && !(terms instanceof Set)) {
			throw new Error("terms must be either an Array or a Set");
		}

		this._terms = new Set(terms);
	}

	/**
	 * Add one or more terms to the vocabulary
	 *
	 * @param {(string|Array<string>|Set<string>)} terms
	 * @return {this}
	 */
	add(terms: string | Array<string> | Set<string>): this {
		if (
			typeof terms !== "string" &&
			!Array.isArray(terms) &&
			!(terms instanceof Set)
		) {
			throw new Error("terms must be either a string, Array or Set");
		}

		if (typeof terms === "string") {
			terms = [terms];
		} else if (terms instanceof Set) {
			terms = Array.from(terms);
		}

		for (const term of terms) {
			this._terms.add(term);
		}

		return this;
	}

	/**
	 * Remove one or more terms from the vocabulary
	 *
	 * @param {(string|Array<string>|Set<string>)} terms
	 * @return {this}
	 */
	remove(terms: string | Array<string> | Set<string>): this {
		if (
			typeof terms !== "string" &&
			!Array.isArray(terms) &&
			!(terms instanceof Set)
		) {
			throw new Error("terms must be either a string, Array or Set");
		}

		if (typeof terms === "string") {
			terms = [terms];
		} else if (terms instanceof Set) {
			terms = Array.from(terms);
		}

		for (const term of terms) {
			this._terms.delete(term);
		}

		return this;
	}

	/**
	 * Return whether the vocabulary contains a certain term
	 *
	 * @param {string} term
	 * @return {boolean}
	 */
	has(term: string): boolean {
		return this._terms.has(term);
	}

	/**
	 * Return the index of a term in the vocabulary (returns -1 if not found)
	 *
	 * @param {string} term
	 * @return {number}
	 */
	indexOf(term: string): number {
		if (!this._terms.has(term)) {
			return -1;
		}

		return Array.from(this._terms).indexOf(term);
	}
}
