import { Heart, Leaf, Star, TimerIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

type Recipe = {
	id: number;
	title: string;
	image: string;
	readyInMinutes: number;
};

type RecipeCardProps = {
	recipe: Recipe;
};

function RecipeCard({ recipe }: RecipeCardProps) {
	// function fetchRecipe(recipeId: number) {
	// 	const myApiKey = import.meta.env.VITE_API_URL;

	// 	return fetch(
	// 		`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${myApiKey}`,
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setRecipe(data);
	// 			return;
	// 		});
	// }
	return (
		<section className=" mt-20 h-64">
			<NavLink to={`/recipe/${recipe.id}`} className="flex">
				<div className="w-6/12 overflow-hidden ">
					<img
						className="aspect-square w-full h-full object-cover rounded-l-box border-primary"
						src={recipe.image}
						alt=""
					/>
				</div>
				<article className="w-6/12 flex flex-col p-4 border rounded-r-box bg-surface border-primary">
					<Heart className=" self-end m-4" />
					<h3 className="pb-4 font-bold text-2xl ">{recipe.title}</h3>
					<div className="w-full flex justify-around py-4">
						<Leaf className="text-success" />
						<Star className="text-amber-300" />
					</div>
					<div className="flex justify-around py-8">
						<TimerIcon className="text-text-muted" />
						<p className="text-text-muted">{recipe.readyInMinutes}min</p>
					</div>
				</article>
			</NavLink>
		</section>
	);
}

export default RecipeCard;
