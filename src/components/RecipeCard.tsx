import { Leaf, Star, TimerIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { Filters, Recipe } from "../types/recipe.types";
import FavoriteButton from "./FavoriteButton";

type RecipeCardProps = {
	recipe: Recipe;
	filters: Filters;
};

function RecipeCard({ recipe, filters }: RecipeCardProps) {
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
					<div className="flex justify-between items-center py-4">
						<div className="flex items-center gap-1">
							<Star size={20} className="text-amber-300 fill-amber-300" />
							<p className="text-amber-300 text-sm font-medium">
								4.5/5
							</p>
						</div>

						<FavoriteButton recipe={recipe} />
					</div>
					<div className="my-2 flex flex-wrap gap-1">
						{filters.diet && (
							<span className="badge badge-primary badge-sm">
								{filters.diet}
							</span>
						)}
						{filters.intolerances.map((item) => (
							<span key={item} className="badge badge-secondary badge-sm">
								{item}
							</span>
						))}

					</div>
					<h3 className="pb-4 font-bold text-xl sm:text-2xl ">
						{recipe.title}
					</h3>
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
