import { ContractError } from './errors.js';

export const FateDie = {
  roll(generator) {
    return generator.generate(-1, 1);
  }
};
