<a name="Classifier"></a>

## Classifier

* [Classifier](#Classifier)
    * [new Classifier([model])](#new_Classifier_new)
    * [.model](#Classifier+model) : <code>Model</code>
    * [.train([input], label)](#Classifier+train) ⇒ <code>this</code>
    * [.predict(input, [maxMatches], [minimumConfidence])](#Classifier+predict) ⇒ <code>Array</code>
    * [.splitWords(input)](#Classifier+splitWords) ⇒ <code>Array</code>
    * [.tokenize(input)](#Classifier+tokenize) ⇒ <code>Object</code>
    * [.vectorize(tokens)](#Classifier+vectorize) ⇒ <code>Object</code>
    * [.cosineSimilarity(v1, v2)](#Classifier+cosineSimilarity) ⇒ <code>float</code>

<a name="new_Classifier_new"></a>

### new Classifier([model])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [model] | `Model` \| `Object` |  |  |
| [model.nGramMin] | `int` | `1` | Minimum n-gram size |
| [model.nGramMax] | `int` | `1` | Maximum n-gram size |
| [model.minimumConfidence] | `int` \| `float` | `0.2` | Minimum confidence required for predictions |
| [model.vocabulary] | `Array` \| `Set` \| `false` | `[]` | Terms mapped to indexes in the model data, set to `false` to store terms directly in the data entries |
| [model.data] | `Object` | `{}` | Key-value store of labels and training data vectors |

<a name="Classifier+model"></a>

### classifier.model : `Model`
Model instance

<a name="Classifier+train"></a>

### classifier.train([input], label) ⇒ `this`
Train the current model using an input string (or array of strings) and a corresponding label

| Param | Type | Description |
| --- | --- | --- |
| input | `string` \| `Array` | String, or an array of strings |
| label | `string` | Corresponding label |

<a name="Classifier+predict"></a>

### classifier.predict(input, [maxMatches], [minimumConfidence]) ⇒ `Array`
Return an array of one or more Prediction instances

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | `string` |  | Input string to make a prediction from |
| [maxMatches] | `int` | `1` | Maximum number of predictions to return |
| [minimumConfidence] | `float` | `null` | Minimum confidence required to include a prediction |

<a name="Classifier+splitWords"></a>

### classifier.splitWords(input) ⇒ `Array`
Split a string into an array of lowercase words, with all non-letter characters removed

| Param | Type |
| --- | --- |
| input | `string` | 

<a name="Classifier+tokenize"></a>

### classifier.tokenize(input) ⇒ `Object`
Create an object literal of unique tokens (n-grams) as keys, and their
respective occurrences as values based on an input string, or array of words

| Param | Type |
| --- | --- |
| input | `string` \| `Array` | 

<a name="Classifier+vectorize"></a>

### classifier.vectorize(tokens) ⇒ `Object`
Convert a tokenized object into a new object with all keys (terms)
translated to their index in the vocabulary (adding all terms to
the vocabulary that do not already exist)

| Param | Type |
| --- | --- |
| tokens | `Object` | 

<a name="Classifier+cosineSimilarity"></a>

### classifier.cosineSimilarity(v1, v2) ⇒ `float`
Return the cosine similarity between two vectors

| Param | Type |
| --- | --- |
| v1 | `Object` | 
| v2 | `Object` | 
