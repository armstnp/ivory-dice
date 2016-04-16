const MaximalSymbol = Symbol('Maximal');
const MinimalSymbol = Symbol('Minimal');
const CriticalSymbol = Symbol('Critical');

const RollAspects = {
	[MaximalSymbol]: roll => { roll.isMaximal = true; },
	[MinimalSymbol]: roll => { roll.isMinimal = true; },
	[CriticalSymbol]: roll => { roll.isCritical = true; }
};

export const Aspects = {
	Minimal: MinimalSymbol,
	Maximal: MaximalSymbol,
	Critical: CriticalSymbol
};

export const RollBuilder = function(value) {
	return {
		value: value,
		faceRender: String(value),
		isMaximal: false,
		isMinimal: false,
		isCritical: false,
		withFaceRender: function(faceRender) { //TODO: Contractually require string
			this.faceRender = faceRender;
			delete this.withFaceRender;
			return this;
		},
		withAspects: function(...aspects) { //TODO: Contractually require arry of Aspects
			for(let aspect of aspects) {
				RollAspects[aspect](this);
			}
			delete this.withAspects;
			return this;
		},
		finalize: function() {
			return {
				value: this.value,
				faceRender: this.faceRender,
				isMaximal: this.isMaximal,
				isMinimal: this.isMinimal,
				isCritical: this.isCritical
			};
		}
	};
};
