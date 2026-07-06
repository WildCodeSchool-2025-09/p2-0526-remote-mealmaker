interface Recipe {
	id: number;
	title: string;
	image: string;
	readyInMinutes: number;
	summary: string;
	analyzedInstructions: AnalyzedInstruction[];
}

export interface Ingredient {
	id: number;
	name: string;
	image: string;
}

export interface Step {
	number: number;
	step: string;
	ingredients: Ingredient[];
}

export interface AnalyzedInstruction {
	steps: Step[];
}

export default Recipe