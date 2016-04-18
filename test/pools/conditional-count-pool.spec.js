import { ConditionalCountPool } from '../../src/pools/conditional-count-pool.js';
import { ConstantDie } from '../../src/dice/constant-die.js';
import { BasicDie } from '../../src/dice/basic-die.js';
import { MinGenerator, MaxGenerator } from '../../src/generators/standard-generators.js';
import { SweepGenerator } from '../../src/generators/sweep-generator.js';
import R from 'ramda';

const createConditionalCountPool = (die, quantity, predicate) => new ConditionalCountPool(die, quantity, predicate);
const d1 = new ConstantDie(1);
const d6 = new BasicDie(6);

describe('A conditional count pool', () => {
  describe('when created', () => {
    it('should throw on violation of input constraint by receiving a die quantity < 0', () => {
      expect(createConditionalCountPool.bind({}, d1, -1, (value) => true)).to.throw();
    });

    it('should throw on violation of input constraint by receiving a non-numeric die quantity', () => {
      expect(createConditionalCountPool.bind({}, d1, '6', (value) => true)).to.throw();
    });

    it('should throw on violation of input constraint by receiving a non-integer die quantity', () => {
      expect(createConditionalCountPool.bind({}, d1, 6.5, (value) => true)).to.throw();
    });

    it('should throw on violation of input constraint by receiving a non-function die predicate', () => {
      expect(createConditionalCountPool.bind({}, d1, 1, true)).to.throw();
    });
  });

  describe('when rolled', () => {
    it('should return an empty result totalling 0 when no dice are given', () => {
      let result = new ConditionalCountPool(d6, 0, (rollValue) => true).roll(MinGenerator);
      expect(result.rolls).to.be.empty;
      expect(result.total).to.equal(0);
    });

    it('should return a list of all rolls and the count of all rolls when dice are given and predicate always passes', () => {
      let result = new ConditionalCountPool(d6, 5, (rollValue) => true).roll(MaxGenerator);
      expect(result.total).to.equal(5);
    });

    it('should use the provided generator to roll its dice', () => {
      let result = new ConditionalCountPool(d6, 5, (rollValue) => true).roll(MaxGenerator);
      expect(result.rolls.map(roll => roll.value)).to.eql([6, 6, 6, 6, 6]);
      expect(result.rolls.map(roll => roll.passed)).to.eql([true, true, true, true, true]);
      expect(result.total).to.equal(5);
    });

    it('should use the provided predicate to filter which die rolls are counted', () => {
      let result = new ConditionalCountPool(d6, 3, (rollValue) => rollValue % 2 === 1).roll(new SweepGenerator());
      expect(result.rolls.map(roll => roll.value)).to.eql([1, 2, 3]);
      expect(result.rolls.map(roll => roll.passed)).to.eql([true, false, true]);
      expect(result.total).to.equal(2);
    });
  })
});
