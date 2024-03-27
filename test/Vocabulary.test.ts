import { describe, expect, test } from 'vitest';
import { Vocabulary } from '../src/Vocabulary.js';

describe('Vocabulary', () => {
	describe('constructor', () => {
		test('should throw an error if terms is not an array or set', () => {
			// @ts-expect-error Error check
			expect(() => new Vocabulary({})).toThrow(Error);
		});
	});

	describe('size', () => {
		test('should return a number', () => {
			const vocabulary = new Vocabulary();

			expect(typeof vocabulary.size).toStrictEqual('number');
		});

		test('should return the vocabulary size', () => {
			const vocabulary = new Vocabulary(['hello']);

			expect(vocabulary.size).toStrictEqual(1);
		});
	});

	describe('terms', () => {
		test('should return a set instance', () => {
			const vocabulary = new Vocabulary();

			expect(vocabulary.terms).toBeInstanceOf(Set);
		});

		test('should return the vocabulary terms', () => {
			const vocabulary = new Vocabulary(['hello']);

			expect(Array.from(vocabulary.terms)).toStrictEqual(['hello']);
		});

		test('should set the vocabulary terms from an array', () => {
			const vocabulary = new Vocabulary();

			vocabulary.terms = ['hello', 'world'];

			expect(Array.from(vocabulary.terms)).toStrictEqual(['hello', 'world']);
		});

		test('should set the vocabulary terms from a set', () => {
			const vocabulary = new Vocabulary();

			vocabulary.terms = new Set(['hello', 'world']);

			expect(Array.from(vocabulary.terms)).toStrictEqual(['hello', 'world']);
		});

		test('should throw an error if terms is not an array or set', () => {
			const vocabulary = new Vocabulary();

			expect(() => {
				// @ts-expect-error Error check
				vocabulary.terms = {};
			}).toThrow(Error);
		});
	});

	describe('add', () => {
		test('should throw an error if terms is not a string, array or set', () => {
			const vocabulary = new Vocabulary();

			// @ts-expect-error Error check
			expect(() => vocabulary.add({})).toThrow(Error);
		});

		test('should add a term to the vocabulary from a string', () => {
			const vocabulary = new Vocabulary();

			vocabulary.add('test');

			expect(Array.from(vocabulary.terms)).toStrictEqual(['test']);
		});

		test('should add terms to the vocabulary from an array', () => {
			const vocabulary = new Vocabulary();

			vocabulary.add(['hello', 'world']);

			expect(Array.from(vocabulary.terms)).toStrictEqual(['hello', 'world']);
		});

		test('should add terms to the vocabulary from a set', () => {
			const vocabulary = new Vocabulary();

			vocabulary.add(new Set(['hello', 'world']));

			expect(Array.from(vocabulary.terms)).toStrictEqual(['hello', 'world']);
		});

		test('should return vocabulary instance', () => {
			const vocabulary = new Vocabulary();

			expect(vocabulary.add('test')).toBeInstanceOf(Vocabulary);
		});
	});

	describe('remove', () => {
		test('should throw an error if terms is not a string, array or set', () => {
			const vocabulary = new Vocabulary();

			// @ts-expect-error Error check
			expect(() => vocabulary.remove({})).toThrow(Error);
		});

		test('should remove a term to the vocabulary when called with a string', () => {
			const vocabulary = new Vocabulary(['test']);

			vocabulary.remove('test');

			expect(Array.from(vocabulary.terms)).toStrictEqual([]);
		});

		test('should remove terms from the vocabulary when called with an array', () => {
			const vocabulary = new Vocabulary(['hello', 'world']);

			vocabulary.remove(['world']);

			expect(Array.from(vocabulary.terms)).toStrictEqual(['hello']);
		});

		test('should remove terms from the vocabulary when called with a set', () => {
			const vocabulary = new Vocabulary(['hello', 'world']);

			vocabulary.remove(new Set(['world']));

			expect(Array.from(vocabulary.terms)).toStrictEqual(['hello']);
		});

		test('should return a vocabulary instance', () => {
			const vocabulary = new Vocabulary(['test']);

			expect(vocabulary.remove('test')).toBeInstanceOf(Vocabulary);
		});
	});

	describe('has', () => {
		test('should return a boolean', () => {
			const vocabulary = new Vocabulary();

			expect(typeof vocabulary.has('test')).toStrictEqual('boolean');
		});

		test('should return whether a term exists in the vocabulary', () => {
			const vocabulary = new Vocabulary(['test']);

			expect(vocabulary.has('test')).toStrictEqual(true);
		});
	});

	describe('indexOf', () => {
		test('should return the index of an existing vocabulary term', () => {
			const vocabulary = new Vocabulary(['test']);

			expect(vocabulary.indexOf('test')).toStrictEqual(0);
		});

		test('should return -1 for non-existing vocabulary terms', () => {
			const vocabulary = new Vocabulary();

			expect(vocabulary.indexOf('test')).toStrictEqual(-1);
		});
	});
});
