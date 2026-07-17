import { useCallback, useEffect, useRef } from "react";
import RecipeCard from "./RecipeCard";
import { useSearch } from "./contexts/SearchContext";
import type { Filters, Ingredient } from "../types/recipe.types";

interface GetRecipesProps {
	selectedIngredients: Ingredient[];
	filters: Filters;
}

function GetRecipes({ selectedIngredients, filters }: GetRecipesProps) {
	const { recipes, setRecipes } = useSearch();
	const isFirstRender = useRef(true);

	const fetchRecipeByIngredients = useCallback(
		(selectedIngredients: Ingredient[]) => {
			const myApiKey = import.meta.env.VITE_API_URL;

			const ingredients = selectedIngredients
				.map((ingredient) => ingredient.name)
				.join(",");

			let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${myApiKey}`;

			url += `&includeIngredients=${ingredients}`;

			if (filters.diet !== "") {
				url += `&diet=${filters.diet}`;
			}

			if (filters.intolerances.length > 0) {
				url += `&intolerances=${filters.intolerances.join(",")}`;
			}

			url += "&number=5";

			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					setRecipes(data.results);
					return;
				});
		},
		[filters, setRecipes],
	);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		if (selectedIngredients.length === 0) {
			setRecipes([]);
			return;
		}

		const debounceId = setTimeout(() => {
			fetchRecipeByIngredients(selectedIngredients);
		}, 800);

		return () => clearTimeout(debounceId);
	}, [selectedIngredients, fetchRecipeByIngredients, setRecipes]);

	return (
		<>
			<button
				type="button"
				className="btn btn-block btn-primary py-8 text-xl"
				onClick={() => fetchRecipeByIngredients(selectedIngredients)}
			>
				Search your recipe !
			</button>

			{recipes.map((recipe) => (
				<RecipeCard
					key={recipe.id}
					recipe={recipe}
					filters={filters}
				/>
			))}
		</>
	);
}

export default GetRecipes;
