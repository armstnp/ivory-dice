import { Aspects, RollBuilder } from './die-roll.js';
import { ContractError } from '../errors.js';

const { Maximal, Minimal } = Aspects;

export class BasicDie {
  constructor(sides){
    if(!Number.isInteger(sides)) throw new ContractError('A basic die must have a positive integer number of sides');
    if(sides < 1) throw new ContractError('A basic die must have a positive number of sides');

    this.sides = sides;
    this.roll = function(generator) {
      const rollValue = generator.generate(1, this.sides);

      const aspects = [];
      if(rollValue === 1) aspects.push(Minimal);
      if(rollValue === this.sides) aspects.push(Maximal);
      return RollBuilder(rollValue).with.aspects(...aspects);
    };
  }
}
