import ivoryDice from '../src/ivory-dice.js';

describe('ivoryDice', () => {
	it('should return the result of calling the generator function', () => {
		let result = ivoryDice((min, max) => 3);
		expect(result).to.equal(3);
	});

	it('should throw on violation of generator function minimum constraints', () => {
		expect(ivoryDice.bind({}, (min, max) => min - 1)).to.throw();
	});

	it('should throw on violation of generator function maximum constraints', () => {
		expect(ivoryDice.bind({}, (min, max) => max + 1)).to.throw();
	});

	it('should throw on violation of generator integer constraint by receiving a floating point number', () => {
		expect(ivoryDice.bind({}, (min, max) => min + 0.5)).to.throw();
	});

	it('should throw on violation of generator integer constraint by receiving a non-numeric type', () => {
		expect(ivoryDice.bind({}, (min, max) => '1')).to.throw();
	});
});
