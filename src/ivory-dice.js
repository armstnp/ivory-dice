/**
 * ivoryDice
 * Rolls a die using the given generator, returning the resulting roll.
 * The roll will be well-behaved with respect to the generator, i.e. if the generator provides a value X, the unmodified roll of the die will be X.
 *
 * @name ivoryDice
 * @function
 * @param {Function} generator A random generator accepting two arguments, an integer min and an integer max, and returning an integer that is between the two inclusive. The function may contractually expect min <= max.
 *
 * @return {Number} The die roll result
 */

import R from 'ramda';

let validateRoll = R.curry((min, max, roll) => {
	if(!Number.isInteger(roll)) throw 'Generator contract violated: Result {roll} is not an integer';
	if(roll < min) throw `Generator contract violated: Result {roll} is less than the requested minimum {min}`;
	if(roll > max) throw `Generator contract violated: Result {roll} is greater than the requested maximum {max}`;
});

let rollOnce = R.curry((generator, min, max) => {
	let roll = generator(min, max);
	validateRoll(min, max, roll);
	return roll;
});

export default function(generator){
	let min = 1, max = 6;
	return rollOnce(generator, min, max);
};
