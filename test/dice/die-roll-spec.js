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
		const defaultRoll1 = RollBuilder(1).finalize();

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
		const rollWithFaceRender = RollBuilder(1).withFaceRender('A').finalize();

		it('should have the provided face render', () => {
			expect(rollWithFaceRender.faceRender).to.equal('A');
		});

		it('should have an unchanged roll value', () => {
			expect(rollWithFaceRender.value).to.equal(1);
		});

		it('should be unable to select a new face render', () => {
			expect(rollWithFaceRender.withFaceRender).to.be.undefined;
		});
	});

	describe('with aspects requested', () => {
		it('should be unchanged if an empty set of aspects are selected', () => {
			const noAspects = RollBuilder(1).withAspects().finalize();
			expect(noAspects.isMaximal).to.be.false;
			expect(noAspects.isMinimal).to.be.false;
			expect(noAspects.isCritical).to.be.false;
		});

		it('should be maximal if Maximal is selected', () => {
			expect(RollBuilder(1).withAspects(Aspects.Maximal).finalize().isMaximal).to.be.true;
		});

		it('should be minimal if Minimal is selected', () => {
			expect(RollBuilder(1).withAspects(Aspects.Minimal).finalize().isMinimal).to.be.true;
		});

		it('should be maximal if Critical is selected', () => {
			expect(RollBuilder(1).withAspects(Aspects.Critical).finalize().isCritical).to.be.true;
		});

		it('should take into effect only the requested aspects', () => {
			const maximalCriticalRoll = RollBuilder(1).withAspects(Aspects.Maximal, Aspects.Critical).finalize();
			expect(maximalCriticalRoll.isMaximal).to.be.true;
			expect(maximalCriticalRoll.isCritical).to.be.true;
			expect(maximalCriticalRoll.isMinimal).to.be.false;
		});
	});
});
