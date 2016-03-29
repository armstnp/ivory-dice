import { ContractError } from '../errors.js';

class ResultBuilder {
  constructor(condition){
    this.rolls = [];
    this.total = 0;

    this.addRoll = function(rollValue) {
      let passed = condition(rollValue);
      this.rolls.push({
        value: rollValue,
        passed: passed
      });
      if(passed) this.total += 1;
    };

    this.build = function() {
      return {
        rolls: this.rolls,
        total: this.total
      };
    };
  }
}

export class ConditionalCountPool {
  constructor(die, quantity, diePredicate){
    if(!Number.isInteger(quantity)) throw new ContractError('A conditional count pool must have a non-negative integer dice quantity');
    if(quantity < 0) throw new ContractError('An conditional count pool must have a non-negative dice quantity');
    if(!(typeof(diePredicate) === typeof(Function))) throw new ContractError('diePredicate must be a predicate function accepting an integer');

    this.roll = function(generator) {
      let builder = new ResultBuilder(diePredicate);
      for(let i = 0; i < quantity; i++){
        let rollValue = die.roll(generator);
        builder.addRoll(rollValue);
      }
      return builder.build();
    };
  }
}
