import Classifier from '../src/Classifier'
import Model from '../src/Model'

describe('Classifier', () => {
	describe('constructor', () => {
		test('should set the model when passed a model instance', () => {
			const classifier = new Classifier(
				new Model({
					nGramMax: 4
				})
			)

			expect(classifier.model.nGramMax).toStrictEqual(4)
		})

		test('should set the model when passed an object literal', () => {
			const classifier = new Classifier({
				nGramMax: 5
			})

			expect(classifier.model.nGramMax).toStrictEqual(5)
		})
	})

	describe('model', () => {
		test('should return a model instance', () => {
			let classifier = new Classifier()

			expect(classifier.model).toBeInstanceOf(Model)
		})

		test('should set the current model when passed a model instance', () => {
			let classifier = new Classifier()

			classifier.model = new Model({
				nGramMax: 3
			})

			expect(classifier.model.nGramMax).toStrictEqual(3)
		})

		test('should set the current model to a new model instance when passed an object literal', () => {
			let classifier = new Classifier()

			classifier.model = {}

			expect(classifier.model).toBeInstanceOf(Model)
		})
	})

	describe('splitWords', () => {
		test('should throw an error if input is not a string', () => {
			const classifier = new Classifier()

			expect(() => classifier.splitWords(1)).toThrow(Error)
		})

		test('should split a string into an array of words', () => {
			const classifier = new Classifier()

			expect(classifier.splitWords('Hello world!')).toStrictEqual([
				'hello',
				'world'
			])
		})
	})

	describe('tokenize', () => {
		test('should throw an error if input is neither a string or array', () => {
			const classifier = new Classifier()

			expect(() => classifier.tokenize({})).toThrow(Error)
		})

		test('should throw an error if nGramMax is less than nGramMin in model config', () => {
			const classifier = new Classifier()

			classifier.model.nGramMin = 2

			expect(() => classifier.tokenize('Hello world!')).toThrow(Error)
		})

		test('should return an object literal of tokens and their occurrences from a string', () => {
			const classifier = new Classifier()

			expect(classifier.tokenize('Hello world!')).toStrictEqual({
				hello: 1,
				world: 1
			})
		})

		test('should return an object literal of tokens and their occurrences from a string', () => {
			const classifier = new Classifier()

			expect(classifier.tokenize('Hello world!')).toStrictEqual({
				hello: 1,
				world: 1
			})
		})

		test('should return an object literal of tokens and their occurrences from a array', () => {
			const classifier = new Classifier()

			expect(classifier.tokenize(['hello', 'world'])).toStrictEqual({
				hello: 1,
				world: 1
			})
		})

		test('should return an object literal of bigrams when nGramMin/nGramMax is 2', () => {
			const classifier = new Classifier({
				nGramMin: 2,
				nGramMax: 2
			})

			expect(classifier.tokenize('Hello world!')).toStrictEqual({
				'hello world': 1
			})
		})

		test('should return an object literal of unigrams and bigrams when nGramMin/nGramMax is 1/2', () => {
			const classifier = new Classifier({
				nGramMin: 1,
				nGramMax: 2
			})

			expect(classifier.tokenize('Hello world!')).toStrictEqual({
				hello: 1,
				'hello world': 1,
				world: 1
			})
		})

		test('should increment the occurrence of the duplicate tokens', () => {
			const classifier = new Classifier()

			expect(classifier.tokenize('Hello hello!')).toStrictEqual({
				hello: 2
			})
		})
	})

	describe('vectorize', () => {
		test('should throw an error if input is not an object literal', () => {
			const classifier = new Classifier()

			expect(() => classifier.vectorize([])).toThrow(Error)
		})

		test('should throw an error if vocabulary config option is set to false', () => {
			const classifier = new Classifier({
				vocabulary: false
			})

			expect(() => classifier.vectorize({ hello: 1 })).toThrow(Error)
		})

		test('should convert key to its corresponding vocabulary term index', () => {
			const classifier = new Classifier()
			const tokens = classifier.tokenize('Hello')

			const { vector } = classifier.vectorize(tokens)

			expect(vector).toStrictEqual({ 0: 1 })
		})

		test('should use existing term index when token is already in vocabulary', () => {
			const classifier = new Classifier({
				vocabulary: ['hello', 'world']
			})

			const tokens = classifier.tokenize('world')

			const { vector } = classifier.vectorize(tokens)

			expect(vector).toStrictEqual({ 1: 1 })
		})

		test('should return an updated copy of the vocabulary', () => {
			const classifier = new Classifier()

			const tokens = classifier.tokenize('Hello world')

			const { vocabulary } = classifier.vectorize(tokens)

			const terms = vocabulary.terms

			expect(Array.from(terms)).toStrictEqual(['hello', 'world'])
		})
	})

	describe('train', () => {
		test('should throw an error if input is not a string or array', () => {
			const classifier = new Classifier()

			expect(() => classifier.train({}, 'test')).toThrow(Error)
		})

		test('should throw an error if label is not a string', () => {
			const classifier = new Classifier()

			expect(() => classifier.train('test', [])).toThrow(Error)
		})

		test('should add tokens to the vocabulary (if not configured to false)', () => {
			const classifier = new Classifier()

			classifier.train('hello world', 'test')

			const vocabulary = classifier.model.vocabulary

			expect(vocabulary.size).toStrictEqual(2)
		})

		test('should add tokens (and their occurrences) to the model from a string', () => {
			const classifier = new Classifier()

			classifier.train('hello world', 'test')

			const model = classifier.model

			expect(model.data).toStrictEqual({
				test: { 0: 1, 1: 1 }
			})
		})

		test('should add tokens (and their occurrences) to the model from an array of strings', () => {
			const classifier = new Classifier()

			classifier.train(['hello world', 'foo', 'bar'], 'test')

			const model = classifier.model

			expect(model.data).toStrictEqual({
				test: { 0: 1, 1: 1, 2: 1, 3: 1 }
			})
		})

		test('should increment the occurrence of an existing vocabulary term', () => {
			const classifier = new Classifier()

			classifier.train(['hello world', 'foo', 'hello'], 'test')

			const model = classifier.model

			expect(model.data).toStrictEqual({
				test: { 0: 2, 1: 1, 2: 1 }
			})
		})

		test('should return classifier instance', () => {
			const classifier = new Classifier()

			expect(classifier.train('hello world', 'test')).toStrictEqual(
				classifier
			)
		})
	})

	describe('cosineSimilarity', () => {
		test('should throw an error if v1 is not an object literal', () => {
			const classifier = new Classifier()

			expect(() => classifier.cosineSimilarity(false, {})).toThrow(Error)
		})

		test('should throw an error if v2 is not an object literal', () => {
			const classifier = new Classifier()

			expect(() => classifier.cosineSimilarity({}, false)).toThrow(Error)
		})

		test('should return 1 on identical object literals', () => {
			const classifier = new Classifier()

			expect(
				classifier.cosineSimilarity(
					{
						0: 1
					},
					{
						0: 1
					}
				)
			).toStrictEqual(1)
		})

		test('should return 0 on object literals with no similarity', () => {
			const classifier = new Classifier()

			expect(
				classifier.cosineSimilarity(
					{
						0: 1
					},
					{
						1: 1
					}
				)
			).toStrictEqual(0)
		})

		test('should return > 0 on similar object literals', () => {
			const classifier = new Classifier()

			expect(
				classifier.cosineSimilarity(
					{
						0: 1,
						1: 1
					},
					{
						0: 1,
						2: 1
					}
				)
			).toBeGreaterThan(0)
		})

		test('should return 0 when sum of v1 is 0', () => {
			const classifier = new Classifier()

			expect(
				classifier.cosineSimilarity(
					{
						0: 0
					},
					{
						0: 1
					}
				)
			).toStrictEqual(0)
		})

		test('should return 0 when sum of v2 is 0', () => {
			const classifier = new Classifier()

			expect(
				classifier.cosineSimilarity(
					{
						0: 1
					},
					{
						0: 0
					}
				)
			).toStrictEqual(0)
		})
	})

	describe('predict', () => {
		test('should throw an error if input is not a string', () => {
			const classifier = new Classifier()

			expect(() => classifier.predict([])).toThrow(Error)
		})

		test('should throw an error if maxMatches is not a number', () => {
			const classifier = new Classifier()

			expect(() => classifier.predict('', 'test')).toThrow(Error)
		})

		test('should throw an error if minimumConfidence is not a number', () => {
			const classifier = new Classifier()

			expect(() => classifier.predict('', undefined, 'test')).toThrow(
				Error
			)
		})

		test('should throw an error if minimumConfidence is lower than 0', () => {
			const classifier = new Classifier()

			expect(() => classifier.predict('', undefined, -1)).toThrow(Error)
		})

		test('should throw an error if minimumConfidence is higher than 1', () => {
			const classifier = new Classifier()

			expect(() => classifier.predict('', undefined, 2)).toThrow(Error)
		})

		test('should return an array', () => {
			const classifier = new Classifier()

			expect(classifier.predict('test')).toBeInstanceOf(Array)
		})

		test('should return one prediction when trained with a sample', () => {
			const classifier = new Classifier()

			classifier.train('hello world', 'test')

			expect(classifier.predict('hello world').length).toStrictEqual(1)
		})

		test('should not include predictions with a confidence below the configured minimumConfidence', () => {
			const classifier = new Classifier()

			classifier.train('hello world', 'test')

			const minimumConfidence = 0.8

			const predictions = classifier.predict(
				'hello',
				undefined,
				minimumConfidence
			)

			expect(
				predictions.filter((prediction) => {
					return prediction.confidence < minimumConfidence
				}).length
			).toStrictEqual(0)
		})

		test('should not update the model vocabulary', () => {
			const classifier = new Classifier()

			classifier.train('hello world', 'test')
			classifier.predict('hello foo world')

			expect(classifier.model.vocabulary.has('foo')).toStrictEqual(false)
		})
	})
})
