import { Heart, Leaf, Star, TimerIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { Recipe } from "../Type2";

type RecipeCardProps = {
    recipe: Recipe;
};

function RecipeCard({ recipe }: RecipeCardProps) {

	return (
		<section className=" mt-10 w-full max-w-sm mx-auto ">
			<NavLink to={`/recipe/${recipe.id}`} className="flex flex-col">
				<div className="w-full overflow-hidden ">
					<img
						className="aspect-square w-full h-full object-cover rounded-t-box border-primary"
						src={recipe.image}
						alt=""
					/>
				</div>
				<article className="w-full flex flex-col p-4 border rounded-b-box bg-surface border-primary">
					<div className="w-full flex justify-around py-4">
						<Leaf className="text-success" />
						<Star className="text-amber-300" />
						<Heart className=" self-end text-primary" />
					</div>
					<h3 className="pb-4 font-bold text-xl sm:text-2xl ">{recipe.title}</h3>
					<div className="flex justify-center py-4">
						<TimerIcon className="text-text-muted" />
						<p className="text-text-muted">{recipe.readyInMinutes}min</p>
					</div>
				</article>
			</NavLink>
		</section>
	);
}

export default RecipeCard;
