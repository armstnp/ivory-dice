import { BasicGenerator, MinGenerator, MaxGenerator } from '../src/standard-generators.js';

function createGeneratorWithNonFunction(){
  return new BasicGenerator(1);
};

describe('Standard generators', () => {
  describe('BasicGenerator', () => {
    it('should return the result of the provided generator function', () => {
      let generator = new BasicGenerator((min, max) => max);
      expect(generator.generate(1, 6)).to.equal(6);
    });

    describe('the generator construction contract', () => {
      it('should throw when given a non-function generator', () => {
        expect(createGeneratorWithNonFunction).to.throw();
      });
    });
  });

  describe('MinGenerator', () => {
  	it('should return the minimum possible result from the requested range', () => {
  		expect(MinGenerator.generate(1, 6)).to.equal(1);
  	});
  });

  describe('MaxGenerator', () => {
  	it('should return the maximum possible result from the requested range', () => {
  		expect(MaxGenerator.generate(1, 6)).to.equal(6);
  	});
  });
});
