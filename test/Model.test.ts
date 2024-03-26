import { describe, test, expect } from "vitest";

import { Model } from "../src/Model.js";
import { Vocabulary } from "../src/Vocabulary.js";

describe("Model", () => {
	describe("constructor", () => {
		test("should throw an error if config is not an object literal", () => {
			expect(() => new Model([])).toThrow(Error);
		});

		test("should throw an error if config option nGramMin is not a number", () => {
			expect(
				() =>
					new Model({
						nGramMin: "",
					})
			).toThrow(Error);
		});

		test("should throw an error if config option nGramMax is not a number", () => {
			expect(
				() =>
					new Model({
						nGramMax: "",
					})
			).toThrow(Error);
		});

		test("should throw an error if config option nGramMin is less than 1", () => {
			expect(
				() =>
					new Model({
						nGramMin: 0,
					})
			).toThrow(Error);
		});

		test("should throw an error if config option nGramMax is less than 1", () => {
			expect(
				() =>
					new Model({
						nGramMax: 0,
					})
			).toThrow(Error);
		});

		test("should throw an error if config option nGramMax is less than nGramMin", () => {
			expect(
				() =>
					new Model({
						nGramMin: 2,
						nGramMax: 1,
					})
			).toThrow(Error);
		});

		test("should throw an error if data is not an object literal", () => {
			expect(
				() =>
					new Model({
						data: [],
					})
			).toThrow(Error);
		});
	});

	describe("nGramMin", () => {
		test("should return a number", () => {
			const model = new Model();

			expect(typeof model.nGramMin).toStrictEqual("number");
		});

		test("should return the current nGramMin value", () => {
			const model = new Model({
				nGramMin: 3,
				nGramMax: 4,
			});

			expect(model.nGramMin).toStrictEqual(3);
		});

		test("should set the nGramMin value", () => {
			const model = new Model();

			model.nGramMin = 2;

			expect(model.nGramMin).toStrictEqual(2);
		});

		test("should throw an error if size is not an integer", () => {
			const model = new Model();

			expect(() => {
				model.nGramMin = 1.1;
			}).toThrow(Error);
		});
	});

	describe("nGramMax", () => {
		test("should return a number", () => {
			const model = new Model();

			expect(typeof model.nGramMax).toStrictEqual("number");
		});

		test("should return the current nGramMax value", () => {
			const model = new Model({
				nGramMax: 2,
			});

			expect(model.nGramMax).toStrictEqual(2);
		});

		test("should set the nGramMax value", () => {
			const model = new Model();

			model.nGramMax = 3;

			expect(model.nGramMax).toStrictEqual(3);
		});

		test("should throw an error if size is not an integer", () => {
			const model = new Model();

			expect(() => {
				model.nGramMax = 1.1;
			}).toThrow(Error);
		});
	});

	describe("vocabulary", () => {
		test("should return a vocabulary instance", () => {
			const model = new Model();

			expect(model.vocabulary).toBeInstanceOf(Vocabulary);
		});

		test("should return false when vocabulary is configured to false", () => {
			const model = new Model({
				vocabulary: false,
			});

			expect(model.vocabulary).toStrictEqual(false);
		});

		test("should set the vocabulary value when passing an array", () => {
			const model = new Model();

			model.vocabulary = ["hello", "world"];

			expect(Array.from(model.vocabulary.terms)).toStrictEqual([
				"hello",
				"world",
			]);
		});

		test("should set the vocabulary value when passing false", () => {
			const model = new Model();

			model.vocabulary = false;

			expect(model.vocabulary).toStrictEqual(false);
		});
	});

	describe("data", () => {
		test("should return an object literal", () => {
			const model = new Model();

			expect(model.data).toStrictEqual({});
		});

		test("should set the model data", () => {
			const model = new Model();

			model.data = {
				test: { 0: 1 },
			};

			expect(model.data).toStrictEqual({
				test: { 0: 1 },
			});
		});

		test("should throw an error if data is not an object literal", () => {
			const model = new Model();

			expect(() => {
				model.data = [];
			}).toThrow(Error);
		});
	});

	describe("serialize", () => {
		test("should return an object literal created from the current model", () => {
			const model = new Model();

			expect(model.serialize()).toStrictEqual({
				nGramMin: 1,
				nGramMax: 1,
				vocabulary: [],
				data: {},
			});
		});
	});
});
