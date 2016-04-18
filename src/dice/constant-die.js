import { Aspects, RollBuilder } from './die-roll.js';
import { ContractError } from '../errors.js';

const { Minimal, Maximal } = Aspects;

export class ConstantDie {
  constructor(value){
    if(!Number.isInteger(value)) throw new ContractError('A constant die must be given an integer value to roll');

    this.roll = function(generator) {
      return RollBuilder(value).with.aspects(Minimal, Maximal);
    };
  }
}
