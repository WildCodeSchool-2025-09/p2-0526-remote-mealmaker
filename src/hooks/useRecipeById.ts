import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe.types";

function useRecipeById(id: number | undefined, cachedRecipe?: Recipe | null) {
	const [recipe, setRecipe] = useState<Recipe | null>(cachedRecipe ?? null);
	const [loading, setLoading] = useState(!cachedRecipe);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (cachedRecipe) {
			setRecipe(cachedRecipe);
			setLoading(false);
			setError(null);
			return;
		}

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
	}, [id, cachedRecipe]);

	return { recipe, loading, error };
}

export default useRecipeById;
