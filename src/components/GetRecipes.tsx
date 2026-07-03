import { useState } from "react";

function GetRecipes({ selectedIngredients }) {
	console.info(selectedIngredients);
	const [recipeByIngredients, setRecipeByIngredients] = useState([]);

	function fetchRecipeByIngredients(selectedIngredients: string[]) {
		const myApiKey = import.meta.env.VITE_API_URL;

		const ingredients = selectedIngredients
			.map((ingredient) => ingredient.name)
			.join(",");

		fetch(
			`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${myApiKey}`,
		)

			.then((response) => response.json())
			.then((data) => {
				console.info(data);
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
				<p key={recipe.id}>{recipe.id}</p>
			))}
		</>
	);
}

export default GetRecipes;
