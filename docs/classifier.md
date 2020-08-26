<a name="Classifier"></a>

## Classifier

* [Classifier](#Classifier)
    * [new Classifier([model])](#new_Classifier_new)
    * [.model](#Classifier+model) : <code>Model</code>
    * [.train([input], label)](#Classifier+train) ⇒ <code>this</code>
    * [.predict(input, [maxMatches], [minimumConfidence])](#Classifier+predict) ⇒ <code>Array</code>

<a name="new_Classifier_new"></a>

### new Classifier([model])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [model] | <code>Model</code> \| <code>Object</code> |  |  |
| [model.nGramMin] | <code>int</code> | <code>1</code> | Minimum n-gram size |
| [model.nGramMax] | <code>int</code> | <code>1</code> | Maximum n-gram size |
| [model.minimumConfidence] | <code>int</code> \| <code>float</code> | <code>0.2</code> | Minimum confidence required for predictions |
| [model.vocabulary] | <code>Array</code> \| <code>Set</code> \| <code>false</code> | <code>[]</code> | Terms mapped to indexes in the model data entries, set to false to store terms directly in the data entries |
| [model.data] | <code>int</code> | <code>{}</code> | Key-value store containing all training data |

<a name="Classifier+model"></a>

### classifier.model : <code>Model</code>
Model instance

<a name="Classifier+train"></a>

### classifier.train([input], label) ⇒ <code>this</code>
Train the current model using an input string (or array of strings) and a corresponding label

| Param | Type | Description |
| --- | --- | --- |
| [input] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | String, or an array of strings |
| label | <code>string</code> | Corresponding label |

<a name="Classifier+predict"></a>

### classifier.predict(input, [maxMatches], [minimumConfidence]) ⇒ <code>Array</code>
Return an array of one or more Prediction instances

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | Input string to make a prediction from |
| [maxMatches] | <code>int</code> | <code>1</code> | Maximum number of predictions to return |
| [minimumConfidence] | <code>float</code> | <code>null</code> | Minimum confidence required to include a prediction |
