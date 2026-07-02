import { useState } from "react";



function RecipesByIngredients() {
	const [recipeByIngredients, setRecipeByIngredients] = useState([]);

	function fetchRecipeByIngredients(selectedIngredients: string[]) {
		const myApiKey = import.meta.env.VITE_API_URL;

		const ingredients = selectedIngredients.join(",");

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
				onClick={() =>
					fetchRecipeByIngredients(["anchovy", "mozzarella", "garlic clove"])
				}
			>
				Rechercher la recette !
			</button>

			{recipeByIngredients.map((recipe) => (
				<p key={recipe.id}>{recipe.id}</p>
			))}
		</>
	);
}

export default RecipesByIngredients;
