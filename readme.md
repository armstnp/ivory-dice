# ivory-dice
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> Rolls any-sided die with customizable input generators.

## Installation

```
$ npm install --save ivory-dice
```

## Usage
```js
const ivoryDice = require('ivory-dice');
var rollResult = ivoryDice((min, max) => Math.floor(Math.random()*(max - min + 1) + min), 6);
```

## API

### `ivoryDice(generator, [sides])`
Rolls a die using the given generator, returning the resulting roll.

The roll will be well-behaved with respect to the generator, i.e. if the generator provides a value `X`, the unmodified roll of the die will be `X`.

#### Parameters
- **Function** `generator`: A random generator accepting two arguments, an integer `min` and an integer `max`, and returning an integer that is between the two inclusively. The function may contractually expect `min <= max`.
- **Number** `sides`: The number of sides of the die to be rolled.  Must be >= 1. Default: 6

#### Return
- **Number** - The die roll result

## License
MIT © [Nathan Armstrong](http://github.com/armstnp)

[travis-url]: https://travis-ci.org/armstnp/ivory-dice
[travis-image]: https://img.shields.io/travis/armstnp/ivory-dice.svg?style=flat-square

[depstat-url]: https://david-dm.org/armstnp/ivory-dice
[depstat-image]: https://david-dm.org/armstnp/ivory-dice.svg?style=flat-square
