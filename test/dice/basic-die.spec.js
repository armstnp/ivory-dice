import { BasicDie } from '../../src/dice/basic-die.js';
import { MinGenerator, MaxGenerator } from '../../src/generators/standard-generators.js';
import R from 'ramda';

const createBasicDie = (sides) => new BasicDie(sides);

describe('BasicDie', () => {
  describe('the die contract', () => {
    it('should throw on violation of input constraint by receiving a number of sides < 1', () => {
      expect(createBasicDie.bind({}, 0)).to.throw();
    });

    it('should throw on violation of input constraint by receiving a non-numeric number of sides', () => {
      expect(createBasicDie.bind({}, '6')).to.throw();
    });

    it('should throw on violation of input constraint by receiving a non-integer number of sides', () => {
      expect(createBasicDie.bind({}, 6.5)).to.throw();
    });
  });

  describe('the die', () => {
    it('should request a minimum roll of 1', () => {
      expect(new BasicDie(6).roll(MinGenerator)).to.equal(1);
    });

    it('should request a maximum roll equal to its number of sides', () => {
        expect(new BasicDie(6).roll(MaxGenerator)).to.equal(6);
    });
  })
});
