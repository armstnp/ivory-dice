import { ContractError } from '../errors.js';

const unit = (value) => {
  if(value > 0) return 1;
  if(value < 0) return -1;
  return 0;
}

class Sweeper {
  constructor() {
    this.lastStart = 0;
    this.lastEnd = 0;
    this.index = 0;

    this.step = (start, end) => {
      if(start != this.lastStart || end != this.lastEnd){
        this.lastStart = start;
        this.lastEnd = end;
        this.index = 0;
      }

      let diff = end - start;
      return start + ((this.index++ % (Math.abs(diff) + 1)) * unit(diff));
    }
  }
}

export class SweepGenerator {
  constructor(){
    const sweeper = new Sweeper();

    this.generate = (start, end) => {
      if(!Number.isInteger(start)) throw new ContractError('Generator requires start to be an integer value');
      if(!Number.isInteger(end)) throw new ContractError('Generator requires end to be an integer value');

      return sweeper.step(start, end);
    };
  }
}
