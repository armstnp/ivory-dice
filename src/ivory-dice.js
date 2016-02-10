/**
 * ivoryDice
 * Rolls a die using the given generator, returning the resulting roll.
 * The roll will be well-behaved with respect to the generator, i.e. if the generator provides a value X, the unmodified roll of the die will be X.
 *
 * @name ivoryDice
 * @function
 * @param {Function} generator A random generator accepting two arguments, an integer min and an integer max, and returning an integer that is between the two inclusivey. The function may contractually expect min <= max.
 * @param {Integer} sides The number of sides of the die to be rolled.  Must be >= 1. Default: 6
 *
 * @return {Number} The die roll result
 */

import R from 'ramda';
import { ContractError } from './errors.js';
import { VerifiableGenerator } from './verifiable-generator.js';

function validateDieSpecifications(min, max){
	if(min > max) throw new RangeError(`Input contract violated: minimum roll {min} is greater than maximum roll {max}`);
};

function rollOnce(generator, min, max){
	validateDieSpecifications(min, max);
	const verifiableGenerator = new VerifiableGenerator(generator);
	return verifiableGenerator.generate(min, max);
};

export default function(generator, sides = 6){
	const min = 1;
	return rollOnce(generator, min, sides);
};
