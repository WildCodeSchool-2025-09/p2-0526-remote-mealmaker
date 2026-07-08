import { useState } from "react";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "./RecipeCard";
import type { Ingredient } from "../types";

type GetRecipesProps = {
	selectedIngredients: Ingredient[];
};

function GetRecipes({ selectedIngredients }: GetRecipesProps) {
	const [recipeByIngredients, setRecipeByIngredients] = useState<Recipe[]>([]);

	function fetchRecipeByIngredients(selectedIngredients: Ingredient[]) {
		const myApiKey = import.meta.env.VITE_API_URL;

		const ingredients = selectedIngredients
			.map((ingredient) => ingredient.name)
			.join(",");

		fetch(
			`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((data: Recipe[]) => {
				setRecipeByIngredients(data);
				return;
			});
	}

	return (
		<>
			<button
				type="button"
				className="btn btn-block btn-primary py-8 text-xl"
				onClick={() => fetchRecipeByIngredients(selectedIngredients)}
			>
				Rechercher la recette !
			</button>

			{recipeByIngredients.map((recipe) => (
				<RecipeCard key={recipe.id} recipe={recipe} />
			))}
		</>
	);
}

export default GetRecipes;
