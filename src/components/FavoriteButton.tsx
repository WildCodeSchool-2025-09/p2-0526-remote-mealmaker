import { Heart } from "lucide-react";
import type { Recipe } from "../types/recipe.types";
import { useFavorite } from "./contexts/FavoriteContext";

type FavoriteButtonProps = {
	recipe: Recipe;
};

function FavoriteButton({ recipe }: FavoriteButtonProps) {
	const { isFavorite, toggleFavorite } = useFavorite();
	const isRecipeFavorite = isFavorite(recipe.id);
	return (
		<button
			type="button"
			onClick={(fav) => {
				fav.preventDefault();
				fav.stopPropagation();
				toggleFavorite(recipe);
			}}
			className="bg-transparent border-0 p-0 self-end"
			aria-label={
				isRecipeFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
			}
		>
			<Heart
				className={
					isRecipeFavorite ? "fill-primary text-primary" : "text-primary"
				}
			/>
		</button>
	);
}

export default FavoriteButton;
