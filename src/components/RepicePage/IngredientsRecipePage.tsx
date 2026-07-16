import type Recipe from "../../types/recipe.types";
import type { Ingredient } from "../../types/recipe.types";
import IngredientImage from "./IngredientImage";

type IngredientsRecipePageProps = {
	recipe: Recipe;
};

function IngredientsRecipePage({ recipe }: IngredientsRecipePageProps) {
	const steps = recipe.analyzedInstructions[0]?.steps ?? [];

	const ingredients = steps
		.flatMap((step) => step.ingredients)
		.filter(
			(ingredient, index, all) =>
				all.findIndex((item) => item.id === ingredient.id) === index,
		);

	return (
		<section className="px-4 py-4">
			<h2 className="font-bold text-lg text-text pb-2">Main ingredients</h2>
			<ul className="flex flex-wrap gap-4">
				{ingredients.map((ingredient: Ingredient) => (
					<li key={ingredient.id} className="flex flex-col items-center w-16">
						<IngredientImage image={ingredient.image} alt={ingredient.name} />
						<p className="text-xs text-text-muted text-center">
							{ingredient.name}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}

export default IngredientsRecipePage;
