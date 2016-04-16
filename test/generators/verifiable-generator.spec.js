import { VerifiableGenerator } from '../../src/generators/verifiable-generator.js';

function expectInvalidGeneratorToBreakContract(generator){
  let generate = () => generator.generate(1, 6);
  expect(generate).to.throw();
};

describe('A verifiable generator', () => {
	describe('when asked to generate a value', () => {
  	it('should return the result of calling the generator function', () => {
  		let generator = new VerifiableGenerator((min, max) => 3);
  		expect(generator.generate(1, 6)).to.equal(3);
  	});

		it('should throw on violation of generator function minimum constraints', () => {
      let generator = new VerifiableGenerator((min, max) => min - 1);
			expectInvalidGeneratorToBreakContract(generator);
		});

		it('should throw on violation of generator function maximum constraints', () => {
      let generator = new VerifiableGenerator((min, max) => max + 1);
			expectInvalidGeneratorToBreakContract(generator);
		});

		it('should throw on violation of generator integer constraint by receiving a floating point number', () => {
      let generator = new VerifiableGenerator((min, max) => min + 0.5);
			expectInvalidGeneratorToBreakContract(generator);
		});

		it('should throw on violation of generator integer constraint by receiving a non-numeric type', () => {
      let generator = new VerifiableGenerator((min, max) => '1');
			expectInvalidGeneratorToBreakContract(generator);
		});
	});
});
