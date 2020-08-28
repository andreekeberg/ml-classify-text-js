# 📄 ClassifyText (JS)

[![Version](https://img.shields.io/npm/v/ml-classify-text)](https://www.npmjs.com/package/ml-classify-text) [![Total Downloads](https://img.shields.io/npm/dt/ml-classify-text)](https://www.npmjs.com/package/ml-classify-text) [![License](https://img.shields.io/npm/l/ml-classify-text)](https://www.npmjs.com/package/ml-classify-text)

Use machine learning to classify text using [n-grams](https://en.wikipedia.org/wiki/N-gram) and [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity).

Minimal library that can be used both in the **browser** and in **Node.js**, that allows you to train a model with a large amount of text samples (and corresponding labels), and then use this model to quickly predict one or more appropriate labels for new text samples.

## Installation

**Using npm**

```
npm install ml-classify-text
```

**Using yarn**

```
yarn add ml-classify-text
```

## Getting started

**Import as an ES6 module**

```javascript
import Classifier from 'ml-classify-text'
```

**Import as a CommonJS module**

```javascript
const { Classifier } = require('ml-classify-text')
```

## Basic usage

### Setting up a new Classifier instance

```javascript
const classifier = new Classifier()
```

### Training a model

```javascript
let positive = [
    'This is great, so cool!',
    'Wow, I love it!',
    'It really is amazing',
]

let negative = [
    'This is really bad',
    'I hate it with a passion',
    'Just terrible!',
]

classifier.train(positive, 'positive')
classifier.train(negative, 'negative')
```

### Getting a prediction

```javascript
let predictions = classifier.predict('It sure is pretty great!')

if (predictions.length) {
	predictions.forEach(prediction => {
		console.log(`${prediction.label} (${prediction.confidence})`)
	})
} else {
	console.log('No predictions returned')
}
```

Returning:

```
positive (0.5423261445466404)
```

## Advanced usage

### Configuration

The following configuration options can be passed both directly to a new [Model](docs/model.md), or indirectly by passing it to the [Classifier](docs/classifier.md) constructor.

#### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| **nGramMin** | `int` | `1` | Minimum n-gram size |
| **nGramMax** | `int` | `1` | Maximum n-gram size |
| **vocabulary** | `Array` \| `Set` \| `false` | `[]` | Terms mapped to indexes in the model data, set to `false` to store terms directly in the data entries |
| **data** | `Object` | `{}` | Key-value store of labels and training data vectors |

### Using n-grams

The default behavior is to split up texts by single words (known as a [bag of words](https://en.wikipedia.org/wiki/Bag-of-words_model), or unigrams).

This has a few limitations, since by ignoring the order of words, it's impossible to correctly match phrases and expressions.

In comes [n-grams](https://en.wikipedia.org/wiki/N-gram), which, when set to use more than one word per term, act like a sliding window that moves across the text — a continuous sequence of words of the specified amount, which can greatly improve the accuracy of predictions.

#### Example of using n-grams with a size of 2 (bigrams)

```javascript
const classifier = new Classifier({
	nGramMin: 2,
	nGramMax: 2
})

let tokens = classifier.tokenize('I really dont like it')

console.log(tokens)
```

Returning:

```javascript
{
    'i really': 1,
    'really dont': 1,
    'dont like': 1,
    'like it': 1
}
```

### Serializing a model

After training a model with large sets of data, you'll want to store all this data, to allow you to simply set up a new model using this training data at another time, and quicky make predictions.

To do this, simply use the `serialize` method on your [Model](docs/model.md), and either save the data structure to a file, send it to a server, or store it in any other way you want.

```javascript
let model = classifier.model

console.log(model.serialize())
```

Returning:

```
{
    nGramMin: 1,
    nGramMax: 1,
    vocabulary: [
    	'this',    'is',      'great',
    	'so',      'cool',    'wow',
    	'i',       'love',    'it',
    	'really',  'amazing', 'bad',
    	'hate',    'with',    'a',
    	'passion', 'just',    'terrible'
    ],
    data: {
        positive: {
            '0': 1, '1': 2, '2': 1,
            '3': 1, '4': 1, '5': 1,
            '6': 1, '7': 1, '8': 2,
            '9': 1, '10': 1
        },
        negative: {
            '0': 1, '1': 1, '6': 1,
            '8': 1, '9': 1, '11': 1,
            '12': 1, '13': 1, '14': 1,
            '15': 1, '16': 1, '17': 1
        }
    }
}
```

## Documentation

* [Classifier](docs/classifier.md)
* [Model](docs/model.md)
* [Vocabulary](docs/vocabulary.md)
* [Prediction](docs/prediction.md)

## Contributing

Read the [contribution guidelines](CONTRIBUTING.md).

## Changelog

Refer to the [changelog](CHANGELOG.md) for a full history of the project.

## License

ClassifyText is licensed under the [MIT license](LICENSE).
