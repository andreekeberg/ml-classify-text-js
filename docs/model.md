<a name="Model"></a>

## Model

* [Model](#Model)
    * [new Model([config])](#new_Model_new)
    * [.nGramMin](#Model+nGramMin) : `int`
    * [.nGramMax](#Model+nGramMax) : `int`
    * [.minimumConfidence](#Model+minimumConfidence) : `float`
    * [.vocabulary](#Model+vocabulary) : `Vocabulary` \| `false`
    * [.data](#Model+data) : `Object`
    * [.serialize()](#Model+serialize) ⇒ `Object`

<a name="new_Model_new"></a>

### new Model([config])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | `Object` |  |  |
| [config.nGramMin] | `int` | `1` | Minimum n-gram size |
| [config.nGramMax] | `int` | `1` | Maximum n-gram size |
| [config.minimumConfidence] | `int` \| `float` | `0.2` | Minimum confidence required for predictions |
| [config.vocabulary] | `Array` \| `Set` \| `false` | `[]` | Terms mapped to indexes in the model data entries, set to false to store terms directly in the data entries |
| [config.data] | `Object` | `{}` | Key-value store containing all training data |

<a name="Model+nGramMin"></a>

### model.nGramMin : `int`
Minimum n-gram size

<a name="Model+nGramMax"></a>

### model.nGramMax : `int`
Maximum n-gram size

<a name="Model+minimumConfidence"></a>

### model.minimumConfidence : `float`
Minimum confidence required for predictions

<a name="Model+vocabulary"></a>

### model.vocabulary : `Vocabulary` \| `false`
Vocabulary instance

<a name="Model+data"></a>

### model.data : `Object`
Model data

<a name="Model+serialize"></a>

### model.serialize() ⇒ `Object`
Return the model in its current state for storing, including the configured
n-gram min/max values, the minimum confidence required for for predictions,
the vocabulary as an array (if any, otherwise false), and an object literal
with all the training data
