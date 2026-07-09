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

export interface Step {
	number: number;
	step: string;
	length?: { number: number; unit: string };
	ingredients: Ingredient[];
}

export interface RecipeCardProps {
	recipe: Recipe;
};

export interface SearchBarProps {
	onAddIngredient: (ingredient: Ingredient) => void;
}

export interface IngredientsListProps {
	ingredients: Ingredient[];
	onRemoveIngredient: (id: number) => void;
}

export interface AnalyzedInstruction {
	steps: Step[];
}

export default Recipe