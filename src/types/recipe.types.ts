export interface Recipe {
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

export interface Filters {
    diet: string;
    intolerances: string[];
}

export interface RecipeStep {
	number: number;
	step: string;
	length?: { number: number; unit: string };
	ingredients: Ingredient[];
}

export interface AnalyzedInstruction {
	steps: RecipeStep[];
}
