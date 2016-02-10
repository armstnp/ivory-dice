import ivoryDice from '../src/ivory-dice.js';

function expectInvalidGeneratorToBreakContract(generator){
	expect(ivoryDice.bind({}, generator)).to.throw();
};

describe('ivoryDice', () => {
	it('should return the result of calling the generator function', () => {
		let result = ivoryDice((min, max) => 3);
		expect(result).to.equal(3);
	});

	describe('the generator contract', () => {
		it('should throw on violation of generator function minimum constraints', () => {
			expectInvalidGeneratorToBreakContract((min, max) => min - 1);
		});

		it('should throw on violation of generator function maximum constraints', () => {
			expectInvalidGeneratorToBreakContract((min,max) => max + 1);
		});

		it('should throw on violation of generator integer constraint by receiving a floating point number', () => {
			expectInvalidGeneratorToBreakContract((min, max) => min + 0.5);
		});

		it('should throw on violation of generator integer constraint by receiving a non-numeric type', () => {
			expectInvalidGeneratorToBreakContract((min, max) => '1');
		});
	});

	describe('the die description contract', () => {
		it('should throw on violation of input constraint by receiving a number of sides < 1', () => {
			expect(ivoryDice.bind({}, (min, max) => min, 0)).to.throw();
		});
	});
});
