import { describe, expect, test } from 'vitest';
import { Prediction } from '../src/Prediction.js';

describe('Prediction', () => {
	describe('constructor', () => {
		test('should throw an error if prediction is not an object literal', () => {
			expect(() => new Prediction([])).toThrow(Error);
		});
	});

	describe('label', () => {
		test('should throw an error if label is not a string', () => {
			const prediction = new Prediction();

			expect(() => {
				prediction.label = [];
			}).toThrow(Error);
		});

		test('should return a string', () => {
			const prediction = new Prediction();

			expect(typeof prediction.label).toStrictEqual('string');
		});

		test('should return the defined prediction label', () => {
			const prediction = new Prediction({
				label: 'test',
			});

			expect(prediction.label).toStrictEqual('test');
		});

		test('should set the prediction label', () => {
			const prediction = new Prediction();

			prediction.label = 'test';

			expect(prediction.label).toStrictEqual('test');
		});
	});

	describe('confidence', () => {
		test('should throw an error if confidence is not a number', () => {
			const prediction = new Prediction();

			expect(() => {
				prediction.confidence = 'test';
			}).toThrow(Error);
		});

		test('should return a number', () => {
			const prediction = new Prediction();

			expect(typeof prediction.confidence).toStrictEqual('number');
		});

		test('should return the defined prediction confidence', () => {
			const prediction = new Prediction({
				confidence: 0.5,
			});

			expect(prediction.confidence).toBeCloseTo(0.5);
		});

		test('should set the prediction confidence', () => {
			const prediction = new Prediction();

			prediction.confidence = 1;

			expect(prediction.confidence).toStrictEqual(1);
		});
	});
});
