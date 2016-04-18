import { RollBuilder, Aspects } from '../../src/dice/die-roll.js';

describe('Die roll aspects', () => {
	it('should include a Maximal symbol', () => {
		expect(Aspects.Maximal).is.not.null;
	});

	it('should include a Minimal symbol', () => {
		expect(Aspects.Minimal).is.not.null;
	});

	it('should include a Critical symbol', () => {
		expect(Aspects.Critical).is.not.null;
	});
});

describe('A die roll', () => {
	describe('by default', () => {
		const defaultRoll1 = RollBuilder(1);

		it('should contain the provided value', () => {
			expect(defaultRoll1.value).to.equal(1);
		});

		it('should use the roll value to produce a face render', () => {
			expect(defaultRoll1.faceRender).to.equal('1');
		});

		it('should not be maximal', () => {
			expect(defaultRoll1.isMaximal).to.be.false;
		});

		it('should not be minimal', () => {
			expect(defaultRoll1.isMinimal).to.be.false;
		});

		it('should not be Critical', () => {
			expect(defaultRoll1.isCritical).to.be.false;
		});
	});

	describe('with a custom face render', () => {
		const rollWithFaceRender = RollBuilder(1).with.faceRender('A');

		it('should have the provided face render', () => {
			expect(rollWithFaceRender.faceRender).to.equal('A');
		});

		it('should have an unchanged roll value', () => {
			expect(rollWithFaceRender.value).to.equal(1);
		});
	});

	describe('with aspects requested', () => {
		it('should be unchanged if an empty set of aspects are selected', () => {
			const noAspects = RollBuilder(1).with.aspects();
			expect(noAspects.isMaximal).to.be.false;
			expect(noAspects.isMinimal).to.be.false;
			expect(noAspects.isCritical).to.be.false;
		});

		it('should be maximal if Maximal is selected', () => {
			expect(RollBuilder(1).with.aspects(Aspects.Maximal).isMaximal).to.be.true;
		});

		it('should be minimal if Minimal is selected', () => {
			expect(RollBuilder(1).with.aspects(Aspects.Minimal).isMinimal).to.be.true;
		});

		it('should be maximal if Critical is selected', () => {
			expect(RollBuilder(1).with.aspects(Aspects.Critical).isCritical).to.be.true;
		});

		it('should take into effect only the requested aspects', () => {
			const maximalCriticalRoll = RollBuilder(1).with.aspects(Aspects.Maximal, Aspects.Critical);
			expect(maximalCriticalRoll.isMaximal).to.be.true;
			expect(maximalCriticalRoll.isCritical).to.be.true;
			expect(maximalCriticalRoll.isMinimal).to.be.false;
		});
	});

	describe('that has been finalized', () => {
		it('should be unable to select new mutations', () => {
			expect(RollBuilder(1).finalize().with).to.be.undefined;
		});

		it('should be unable to re-finalize', () => {
			expect(RollBuilder(1).finalize().finalize).to.be.undefined;
		});

		it('should preserve state selected during construction', () => {
			const roll = RollBuilder(1).with.faceRender('A').with.aspects(Aspects.Maximal, Aspects.Critical).finalize();
			expect(roll.value).to.equal(1);
			expect(roll.faceRender).to.equal('A');
			expect(roll.isMaximal).to.be.true;
			expect(roll.isMinimal).to.be.false;
			expect(roll.isCritical).to.be.true;
		});
	});
});
