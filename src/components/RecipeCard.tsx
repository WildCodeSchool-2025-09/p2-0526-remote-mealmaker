import { Heart, Leaf, Star, TimerIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function RecipeCard() {
	const [recipe, setRecipe] = useState();

	function fetchRecipe(recipeId: number) {
		const myApiKey = import.meta.env.VITE_API_URL;

		return fetch(
			`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((data) => {
				setRecipe(data);
				return;
			});
	}
	return (
		<section className="flex mt-4">
			<NavLink to={`/recipe/${recipe && recipe.id}`}>
				<img
					className="w-6/12 rounded-l-box border-primary"
					src={recipe && recipe.image}
					alt=""
				/>
				<article className="w-6/12 flex flex-col p-4 border rounded-r-box bg-surface border-primary">
					<Heart className=" self-end m-4" />
					<h3 className="pb-4 font-bold text-2xl ">{recipe && recipe.title}</h3>
					<div className="w-full flex justify-around py-4">
						<Leaf className="text-success" />
						<Star className="text-amber-300" />
					</div>
					<div className="flex justify-around py-8">
						<TimerIcon className="text-text-muted" />
						<p className="text-text-muted"> X min</p>
					</div>
				</article>
			</NavLink>
			<button
				type="button"
				className="btn btn-secondary"
				onClick={() => fetchRecipe(150)}
			>
				test
			</button>
		</section>
	);
}

export default RecipeCard;
