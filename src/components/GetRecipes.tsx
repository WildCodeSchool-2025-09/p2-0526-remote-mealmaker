import { useState } from "react";
import RecipeCard from "./RecipeCard";
import type { Filters, Ingredient, Recipe } from "../Type2";

interface GetRecipesProps {
	selectedIngredients: Ingredient[];
	filters: Filters;
}

function GetRecipes({ selectedIngredients, filters }: GetRecipesProps) {
	console.info(selectedIngredients);
	const [recipeByIngredients, setRecipeByIngredients] = useState<Recipe[]>([]);

	function fetchRecipeByIngredients(selectedIngredients: Ingredient[]) {
		const myApiKey = import.meta.env.VITE_API_URL;

		const ingredients = selectedIngredients
			.map((ingredient) => ingredient.name)
			.join(",");

		let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${myApiKey}`;

		url += `&includeIngredients=${ingredients}`;

		if (filters.diet) {
			url += `&diet=${filters.diet}`;
		}

		if (filters.intolerances) {
			url += `&intolerances=${filters.intolerances}`;
		}

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setRecipeByIngredients(data.results);
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
