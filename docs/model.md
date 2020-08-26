<a name="Model"></a>

## Model

* [Model](#Model)
    * [new Model([config])](#new_Model_new)
    * [.nGramMin](#Model+nGramMin) : <code>number</code>
    * [.nGramMax](#Model+nGramMax) : <code>number</code>
    * [.minimumConfidence](#Model+minimumConfidence) : <code>number</code>
    * [.vocabulary](#Model+vocabulary) : <code>Vocabulary</code> \| <code>false</code>
    * [.data](#Model+data) : <code>Object</code>
    * [.serialize()](#Model+serialize) ⇒ <code>Object</code>

<a name="new_Model_new"></a>

### new Model([config])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> |  |  |
| [config.nGramMin] | <code>int</code> | <code>1</code> | Minimum n-gram size |
| [config.nGramMax] | <code>int</code> | <code>1</code> | Maximum n-gram size |
| [config.minimumConfidence] | <code>int</code> \| <code>float</code> | <code>0.2</code> | Minimum confidence required for predictions |
| [config.vocabulary] | <code>Array</code> \| <code>Set</code> \| <code>false</code> | <code>[]</code> | Terms mapped to indexes in the model data entries, set to false to store terms directly in the data entries |
| [config.data] | <code>Object</code> | <code>{}</code> | Key-value store containing all training data |

<a name="Model+nGramMin"></a>

### model.nGramMin : <code>number</code>
Minimum n-gram size

<a name="Model+nGramMax"></a>

### model.nGramMax : <code>number</code>
Maximum n-gram size

<a name="Model+minimumConfidence"></a>

### model.minimumConfidence : <code>number</code>
Minimum confidence required for predictions

<a name="Model+vocabulary"></a>

### model.vocabulary : <code>Vocabulary</code> \| <code>false</code>
Vocabulary instance

<a name="Model+data"></a>

### model.data : <code>Object</code>
Model data

<a name="Model+serialize"></a>

### model.serialize() ⇒ <code>Object</code>
Return the model in its current state for storing, including the configured
n-gram min/max values, the vocabulary as an array (if any, otherwise false),
and an object literal with all the training data
