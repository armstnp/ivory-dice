import { ContractError } from './errors.js';

export class BasicDie {
  constructor(sides){
    if(!Number.isInteger(sides)) throw new ContractError('A basic die must have a positive integer number of sides');
    if(sides < 1) throw new ContractError('A basic die must have a positive number of sides');

    this.sides = sides;
    this.roll = function(generator) {
      return generator.generate(1, this.sides);
    };
  }
}
