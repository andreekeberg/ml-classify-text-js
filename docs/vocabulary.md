<a name="Vocabulary"></a>

## Vocabulary

* [Vocabulary](#Vocabulary)
    * [new Vocabulary(terms)](#new_Vocabulary_new)
    * [.size](#Vocabulary+size) : `number`
    * [.terms](#Vocabulary+terms) : `Array` \| `Set`
    * [.add(terms)](#Vocabulary+add) ⇒ `this`
    * [.remove(terms)](#Vocabulary+remove) ⇒ `this`
    * [.has(term)](#Vocabulary+has) ⇒ `bool`
    * [.indexOf(term)](#Vocabulary+indexOf) ⇒ `number`

<a name="new_Vocabulary_new"></a>

### new Vocabulary(terms)

| Param | Type |
| --- | --- |
| terms | `Array` \| `Set` | 

<a name="Vocabulary+size"></a>

### vocabulary.size : `number`
Vocabulary size

<a name="Vocabulary+terms"></a>

### vocabulary.terms : `Array` \| `Set`
Vocabulary terms

<a name="Vocabulary+add"></a>

### vocabulary.add(terms) ⇒ `this`
Add one or more terms to the vocabulary

| Param | Type |
| --- | --- |
| terms | `string` \| `Array` \| `Set` | 

<a name="Vocabulary+remove"></a>

### vocabulary.remove(terms) ⇒ `this`
Remove one or more terms from the vocabulary

| Param | Type |
| --- | --- |
| terms | `string` \| `Array` \| `Set` | 

<a name="Vocabulary+has"></a>

### vocabulary.has(term) ⇒ `bool`
Return whether the vocabulary contains a certain term

| Param | Type |
| --- | --- |
| term | `string` | 

<a name="Vocabulary+indexOf"></a>

### vocabulary.indexOf(term) ⇒ `number`
Return the index of a term in the vocabulary (returns -1 if not found)

| Param | Type |
| --- | --- |
| term | `string` | 

