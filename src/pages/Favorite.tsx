import { useFavorite } from "../components/contexts/FavoriteContext";
import Navbar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";

function Favorite() {
	const { favorites } = useFavorite();

	if (favorites.length === 0) {
		return (
			<>
				<p className="text-center text-text-muted mt-10">
					Aucune recette favorite pour l'instant.
				</p>
				<Navbar />
			</>
		);
	}

	return (
		<>
			<section className="flex flex-col p-8 gap-4">
				{favorites.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</section>
			<Navbar />
		</>
	);
}

export default Favorite;
