const MaximalSymbol = Symbol('Maximal');
const MinimalSymbol = Symbol('Minimal');
const CriticalSymbol = Symbol('Critical');

const RollAspects = {
	[MaximalSymbol]: roll => { return { ...roll, isMaximal: true } },
	[MinimalSymbol]: roll => { return { ...roll, isMinimal: true } },
	[CriticalSymbol]: roll => { return { ...roll, isCritical: true } }
};

export const Aspects = {
	Minimal: MinimalSymbol,
	Maximal: MaximalSymbol,
	Critical: CriticalSymbol
};

const withMutators = roll => {
	roll.with = {
		faceRender: function(faceRender) {
			return withMutators({
				...roll,
				faceRender
			});
		},
		aspects: function(...aspects) {
			let newRoll = roll;
			for(let aspect of aspects) {
				newRoll = RollAspects[aspect](newRoll);
			}
			return withMutators(newRoll);
		}
	};
	return roll;
};

export const RollBuilder = function(value) {
	return withMutators({
		value: value,
		faceRender: String(value),
		isMaximal: false,
		isMinimal: false,
		isCritical: false,
		finalize: function() {
			return {
				...this,
				with: undefined,
				finalize: undefined
			}
		}
	});
};
