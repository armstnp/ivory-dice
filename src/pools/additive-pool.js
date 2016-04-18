import { ContractError } from '../errors.js';

class ResultBuilder {
  constructor(){
    this.rolls = [];
    this.total = 0;

    this.addRoll = function(roll) {
      this.rolls.push(roll.finalize());
      this.total += roll.value;
    };

    this.build = function() {
      return {
        rolls: this.rolls,
        total: this.total
      };
    };
  }
}

export class AdditivePool {
  constructor(die, quantity){
    if(!Number.isInteger(quantity)) throw new ContractError('An additive pool must have a non-negative integer dice quantity');
    if(quantity < 0) throw new ContractError('An additive pool must have a non-negative dice quantity');

    this.roll = function(generator) {
      let builder = new ResultBuilder();
      for(let i = 0; i < quantity; i++){
        let roll = die.roll(generator);
        builder.addRoll(roll);
      }
      return builder.build();
    };
  }
}
