/**
 * @param {Array|Set} terms
 * @constructor
 */
class Vocabulary {
    constructor(terms = []) {
        if (!(terms instanceof Array) && !(terms instanceof Set)) {
            throw new Error('terms must be either an Array or a Set')
        }

        this._terms = new Set(terms)
    }

    /**
     * Vocabulary size
     * 
     * @type {number}
     */
    get size() {
        return this._terms.size
    }

    /**
     * Vocabulary terms
     *
     * @type {(Array|Set)}
     */
    get terms() {
        return this._terms
    }

    set terms(terms) {
        if (!(terms instanceof Array) && !(terms instanceof Set)) {
            throw new Error('terms must be either an Array or a Set')
        }

        this._terms = new Set(terms)
    }

    /**
     * Add one or more terms to the vocabulary
     *
     * @param {(string|Array|Set)} terms
     * @return {this}
     */
    add(terms) {
        if (typeof terms !== 'string' && !(terms instanceof Array) && !(terms instanceof Set)) {
            throw new Error('terms must be either a string, Array or Set')
        }

        if (typeof terms === 'string') {
            terms = [terms]
        } else if (terms instanceof Set) {
            terms = Array.from(terms)
        }

        terms.forEach(term => {
            this._terms.add(term)
        })

        return this
    }

    /**
     * Remove one or more terms from the vocabulary
     *
     * @param {(string|Array|Set)} terms
     * @return {this}
     */
    remove(terms) {
        if (typeof terms !== 'string' && !(terms instanceof Array) && !(terms instanceof Set)) {
            throw new Error('terms must be either a string, Array or Set')
        }

        if (typeof terms === 'string') {
            terms = [terms]
        } else if (terms instanceof Set) {
            terms = Array.from(terms)
        }

        terms.forEach(term => {
            this._terms.delete(term)
        })

        return this
    }

    /**
     * Return whether the vocabulary contains a certain term
     *
     * @param {string} term
     * @return {bool}
     */
    has(term) {
        return this._terms.has(term)
    }

    /**
     * Return the index of a term in the vocabulary (returns -1 if not found)
     *
     * @param {string} term
     * @return {number}
     */
    indexOf(term) {
        if (!this._terms.has(term)) {
            return -1
        }

        return Array.from(this._terms).indexOf(term)
    }
}

export default Vocabulary
