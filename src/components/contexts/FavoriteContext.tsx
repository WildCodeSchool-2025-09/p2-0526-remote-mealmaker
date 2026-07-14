import { createContext, useContext, useState } from "react";
import type { Recipe } from "../../types/recipe.types";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
	const [favorites, setFavorites] = useState<Recipe[]>([]);

	const isFavorite = (recipeId: number) => {
		return favorites.some((favorite) => favorite.id === recipeId);
	};

	const toggleFavorite = (recipe: Recipe) => {
		const alreadyFavorite = isFavorite(recipe.id);

		if (alreadyFavorite) {
			setFavorites(favorites.filter((favorite) => favorite.id !== recipe.id));
		} else {
			setFavorites([...favorites, recipe]);
		}
	};

	return (
		<FavoriteContext value={{ favorites, toggleFavorite, isFavorite }}>
			{children}
		</FavoriteContext>
	);
}

export const useFavorite = () => {
	return useContext(FavoriteContext);
};
