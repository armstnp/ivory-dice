import { BasicDie } from '../../src/dice/basic-die.js';
import { MinGenerator, MaxGenerator } from '../../src/generators/standard-generators.js';
import R from 'ramda';

const createBasicDie = (sides) => new BasicDie(sides);

describe('A basic die', () => {
  describe('when created', () => {
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

  describe('when rolled', () => {
    const d6MinRoll = new BasicDie(6).roll(MinGenerator);
    const d6MaxRoll = new BasicDie(6).roll(MaxGenerator);

    it('should request a minimum roll of 1', () => {
      expect(d6MinRoll.value).to.equal(1);
    });

    it('should request a maximum roll equal to its number of sides', () => {
        expect(d6MaxRoll.value).to.equal(6);
    });

    it('should have a face render equal to its roll value', () => {
      expect(d6MaxRoll.faceRender).to.equal('6');
    });

    it('should be minimal when rolling a 1', () => {
      expect(d6MinRoll.isMinimal).to.be.true;
    });

    it('should be maximal when rolling a value equal to its number of sides', () => {
      expect(d6MaxRoll.isMaximal).to.be.true;
    });

    it('should not be maximal when rolling a value of 1 when number of sides is > 1', () => {
      expect(d6MinRoll.isMaximal).to.be.false;
    });

    it('should not be minimal when rolling a value greater than 1', () => {
      expect(d6MaxRoll.isMinimal).to.be.false;
    });
  })
});
