import { useEffect, useState } from "react";
import type RecipeType from "../types/recipe.types";


function useRecipeById(id: string | undefined) {
	const [recipe, setRecipe] = useState<RecipeType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		const myApiKey = import.meta.env.VITE_API_URL;

		fetch(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${myApiKey}`,
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Erreur ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setRecipe(data);
			})
			.catch((err: Error) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	return { recipe, loading, error };
}

export default useRecipeById;