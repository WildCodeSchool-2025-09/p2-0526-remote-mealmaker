import { Link } from "react-router-dom";
import type { Recipe } from "../../types/recipe.types";

function CompletedRecipe({
	recipe,
	id,
}: { recipe: Recipe; id: string | undefined }) {
	return (
		<section className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center bg-[#5e4b00] bg-[url('/bg-wood.png')] text-neutral-content">
			<img
				src={recipe.image}
				alt={recipe.title}
				className="w-48 h-48 rounded-2xl object-cover"
			/>
			<div>
				<h1 className="text-2xl font-heading font-bold">Bon appétit !</h1>
				<p className="text-lg font-bold">Tu as terminé la recette</p>
			</div>
			<Link to={`/recipe/${id}`} className="btn btn-primary btn-xl w-full">
				Revenir à la recette
			</Link>
			<Link to="/" className="btn btn-outline btn-primary btn-xl w-full">
				Retour à l'accueil
			</Link>
		</section>
	);
}

export default CompletedRecipe;
