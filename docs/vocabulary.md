<a name="Vocabulary"></a>

## Vocabulary

* [Vocabulary](#Vocabulary)
    * [new Vocabulary(terms)](#new_Vocabulary_new)
    * [.size](#Vocabulary+size) : <code>number</code>
    * [.terms](#Vocabulary+terms) : <code>Array</code> \| <code>Set</code>
    * [.add(terms)](#Vocabulary+add) ⇒ <code>this</code>
    * [.remove(terms)](#Vocabulary+remove) ⇒ <code>this</code>
    * [.has(term)](#Vocabulary+has) ⇒ <code>bool</code>
    * [.indexOf(term)](#Vocabulary+indexOf) ⇒ <code>number</code>

<a name="new_Vocabulary_new"></a>

### new Vocabulary(terms)

| Param | Type |
| --- | --- |
| terms | <code>Array</code> \| <code>Set</code> | 

<a name="Vocabulary+size"></a>

### vocabulary.size : <code>number</code>
Vocabulary size

<a name="Vocabulary+terms"></a>

### vocabulary.terms : <code>Array</code> \| <code>Set</code>
Vocabulary terms

<a name="Vocabulary+add"></a>

### vocabulary.add(terms) ⇒ <code>this</code>
Add one or more terms to the vocabulary

| Param | Type |
| --- | --- |
| terms | <code>string</code> \| <code>Array</code> \| <code>Set</code> | 

<a name="Vocabulary+remove"></a>

### vocabulary.remove(terms) ⇒ <code>this</code>
Remove one or more terms from the vocabulary

| Param | Type |
| --- | --- |
| terms | <code>string</code> \| <code>Array</code> \| <code>Set</code> | 

<a name="Vocabulary+has"></a>

### vocabulary.has(term) ⇒ <code>bool</code>
Return whether the vocabulary contains a certain term

| Param | Type |
| --- | --- |
| term | <code>string</code> | 

<a name="Vocabulary+indexOf"></a>

### vocabulary.indexOf(term) ⇒ <code>number</code>
Return the index of a term in the vocabulary (returns -1 if not found)

| Param | Type |
| --- | --- |
| term | <code>string</code> | 

