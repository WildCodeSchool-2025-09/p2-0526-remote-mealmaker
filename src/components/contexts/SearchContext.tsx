import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Filters, Ingredient, Recipe } from "../../types/recipe.types";

type SearchContextType = {
	selectedIngredients: Ingredient[];
	addIngredient: (ingredient: Ingredient) => void;
	removeIngredient: (id: number) => void;
	filters: Filters;
	setFilters: Dispatch<SetStateAction<Filters>>;
	recipes: Recipe[];
	setRecipes: Dispatch<SetStateAction<Recipe[]>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
	const [selectedIngredients, setSelectedIngredients] = useState<
		Ingredient[]
	>([]);
	const [filters, setFilters] = useState<Filters>({
		diet: "",
		intolerances: [],
	});
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	function addIngredient(ingredient: Ingredient) {
		setSelectedIngredients((previous) => {
			const alreadyExists = previous.some((item) => item.id === ingredient.id);
			if (alreadyExists) return previous;
			return [...previous, ingredient];
		});
	}

	function removeIngredient(id: number) {
		setSelectedIngredients((previous) =>
			previous.filter((item) => item.id !== id),
		);
	}

	return (
		<SearchContext
			value={{
				selectedIngredients,
				addIngredient,
				removeIngredient,
				filters,
				setFilters,
				recipes,
				setRecipes,
			}}
		>
			{children}
		</SearchContext>
	);
}

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
};
