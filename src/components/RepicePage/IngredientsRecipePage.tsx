import type Recipe from "../../types/recipe.types";
import type { Ingredient } from "../../types/recipe.types";

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
						<img
							src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
							alt={ingredient.name}
							className="size-12 rounded-full object-cover bg-surface"
						/>
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
