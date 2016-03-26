import { ContractError } from './errors.js';

export class ConstantDie {
  constructor(value){
    if(!Number.isInteger(value)) throw new ContractError('A constant die must be given an integer value to roll');

    this.roll = function(generator) {
      return value;
    };
  }
}
