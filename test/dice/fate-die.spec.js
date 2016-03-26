import { FateDie } from '../../src/dice/fate-die.js';
import { MinGenerator, MaxGenerator } from '../src/standard-generators.js';
import R from 'ramda';

describe('FateDie', () => {
  it('should request a minimum roll of -1', () => {
    expect(FateDie.roll(MinGenerator)).to.equal(-1);
  });

  it('should request a maximum roll of 1', () => {
      expect(FateDie.roll(MaxGenerator)).to.equal(1);
  });
});
