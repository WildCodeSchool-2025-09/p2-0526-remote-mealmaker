import { useState } from "react";
import RecipeCard from "./RecipeCard";

function GetRecipes({ selectedIngredients, filters }) {
	console.info(selectedIngredients);
	const [recipeByIngredients, setRecipeByIngredients] = useState([]);

	function fetchRecipeByIngredients(selectedIngredients: string[]) {
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
		console.info(url);
		
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				console.info(data);
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
