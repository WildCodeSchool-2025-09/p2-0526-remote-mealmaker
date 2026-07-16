import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../../types/recipe.types";
import FavoriteButton from "../FavoriteButton";

type HeroRecipePageProps = {
	recipe: Recipe;
};

function HeroRecipePage({ recipe }: HeroRecipePageProps) {
	const { image } = recipe;
	const navigate = useNavigate();

	return (
		<section className="w-full relative">
			<img src={image} alt="Test" className="w-full" />
			<ul className="w-full h-24 absolute top-0 flex justify-between p-4">
				<li className="text-alert">
					<button type="button" onClick={() => navigate(-1)}>
						<ArrowLeft />
					</button>
				</li>
				<li className="text-alert">
					<FavoriteButton recipe={recipe} />
				</li>
			</ul>
		</section>
	);
}

export default HeroRecipePage;
