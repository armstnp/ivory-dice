import ivoryDice from '../src/ivory-dice.js';

function buildGenerator(generate){
	return { generate };
};

describe('ivoryDice', () => {
	it('should return the result of calling the generator function', () => {
		let generator = buildGenerator((min, max) => 3);
		let result = ivoryDice(generator);
		expect(result).to.equal(3);
	});

	describe('the die description contract', () => {
		it('should throw on violation of input constraint by receiving a number of sides < 1', () => {
			let generator = buildGenerator((min, max) => min);
			expect(ivoryDice.bind({}, generator, 0)).to.throw();
		});
	});
});
