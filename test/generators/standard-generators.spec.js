import { BasicGenerator, MinGenerator, MaxGenerator } from '../../src/generators/standard-generators.js';

function createGeneratorWithNonFunction(){
  return new BasicGenerator(1);
};

describe('Standard generators:', () => {
  describe('A basic generator', () => {
    describe('when constructed', () => {
      it('should throw when given a non-function source', () => {
        expect(createGeneratorWithNonFunction).to.throw();
      });
    });

    describe('when asked to generate a value', () => {
      it('should return the result of the provided source function', () => {
        let generator = new BasicGenerator((min, max) => max);
        expect(generator.generate(1, 6)).to.equal(6);
      });
    });
  });

  describe('A min generator when asked to generate a value', () => {
  	it('should return the minimum possible result from the requested range', () => {
  		expect(MinGenerator.generate(1, 6)).to.equal(1);
  	});
  });

  describe('A max generator when asked to generate a value', () => {
  	it('should return the maximum possible result from the requested range', () => {
  		expect(MaxGenerator.generate(1, 6)).to.equal(6);
  	});
  });
});
