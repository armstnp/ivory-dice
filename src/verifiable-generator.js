import R from 'ramda';
import { ContractError } from './errors.js';

function verifyIntegerValue(value){
  if(!Number.isInteger(value)) throw new TypeError(`Generator contract violated: Result {value} is not an integer`);
};

var verifyMinimumNotExceeded = R.curry((min, value) => {
  if(value < min) throw new ContractError(`Generator contract violated: Result {value} is less than the requested minimum {min}`);
});

var verifyMaximumNotExceeded = R.curry((max, value) => {
  if(value > max) throw new ContractError(`Generator contract violated: Result {value} is greater than the requested maximum {max}`);
});

function verifyGeneratedValue(min, max, value){
  return R.pipe(
    R.tap(verifyIntegerValue),
    R.tap(verifyMinimumNotExceeded(min)),
    R.tap(verifyMaximumNotExceeded(max))
  )(value);
};

export class VerifiableGenerator {
  constructor(generator){
    this.generate = function(min, max){
      let value = generator(min, max);
      verifyGeneratedValue(min, max, value);
      return value;
    };
  }
}
