import { ConstantDie } from '../../src/dice/constant-die.js';
import { MinGenerator, MaxGenerator } from '../../src/generators/standard-generators.js';
import R from 'ramda';

const createConstantDie = (value) => new ConstantDie(value);

describe('A constant die', () => {
  describe('when created', () => {
    it('should throw on violation of input constraint by receiving a non-numeric roll value', () => {
      expect(createConstantDie.bind({}, '6')).to.throw();
    });

    it('should throw on violation of input constraint by receiving a non-integer roll value', () => {
      expect(createConstantDie.bind({}, 6.5)).to.throw();
    });
  });

  describe('when rolled', () => {
    it('should provide its value when rolled with a min-fixed generator', () => {
      expect(new ConstantDie(6).roll(MinGenerator)).to.equal(6);
    });

    it('should provide its value when rolled with a max-fixed generator', () => {
        expect(new ConstantDie(6).roll(MaxGenerator)).to.equal(6);
    });
  })
});
