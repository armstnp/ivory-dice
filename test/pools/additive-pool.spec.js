import { AdditivePool } from '../../src/pools/additive-pool.js';
import { ConstantDie } from '../../src/dice/constant-die.js';
import { BasicDie } from '../../src/dice/basic-die.js';
import { MinGenerator, MaxGenerator } from '../../src/generators/standard-generators.js';
import R from 'ramda';

const createAdditivePool = (die, quantity) => new AdditivePool(die, quantity);
const d1 = new ConstantDie(1);
const d6 = new BasicDie(6);

describe('An additive pool', () => {
  describe('when created', () => {
    it('should throw on violation of input constraint by receiving a die quantity < 0', () => {
      expect(createAdditivePool.bind({}, d1, -1)).to.throw();
    });

    it('should throw on violation of input constraint by receiving a non-numeric die quantity', () => {
      expect(createAdditivePool.bind({}, d1, '6')).to.throw();
    });

    it('should throw on violation of input constraint by receiving a non-integer die quantity', () => {
      expect(createAdditivePool.bind({}, d1, 6.5)).to.throw();
    });
  });

  describe('when rolled', () => {
    it('should return an empty result totalling 0 when no dice are given', () => {
      let result = new AdditivePool(d6, 0).roll(MinGenerator);
      expect(result.rolls).to.be.empty;
      expect(result.total).to.equal(0);
    });

    it('should return a list of all rolls when dice are given', () => {
      let result = new AdditivePool(d1, 5).roll(MinGenerator);
      let rollValue1 = { value: 1 };
      expect(result.rolls).to.eql([rollValue1, rollValue1, rollValue1, rollValue1, rollValue1]);
    });

    it('should return the total of all rolls when dice are given', () => {
      let result = new AdditivePool(d1, 5).roll(MinGenerator);
      let rollValue1 = { value: 1 };
      expect(result.total).to.equal(5);
    });

    it('should use the provided generator to roll its dice', () => {
      let result = new AdditivePool(d6, 5).roll(MaxGenerator);
      let rollValue6 = { value: 6 };
      expect(result.rolls).to.eql([rollValue6, rollValue6, rollValue6, rollValue6, rollValue6]);
      expect(result.total).to.equal(30);
    });
  })
});
