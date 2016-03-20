import { ContractError } from './errors.js';

export class BasicGenerator {
  constructor(generator){
    if(!(typeof(generator) === typeof(Function)))
      throw new ContractError('generator must be a valid function accepting min and max values and returning a value between.');
    this.generate = generator;
  }
}

export const MinGenerator = new BasicGenerator((min, max) => min);

export const MaxGenerator = new BasicGenerator((min, max) => max);
