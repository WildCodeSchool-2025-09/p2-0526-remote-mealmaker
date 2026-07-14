import { X } from "lucide-react";

function IngredientsList({ ingredients, onRemoveIngredient }) {
	return (
		<article className=" flex flex-wrap justify-center gap-2 p-2 rounded-box border  border-solid border-primary bg-surface">
			<p className="w-full text-sage font-bold">My list :</p>
			{ingredients.map((ingredient) => (
				<button
					type="button"
					key={ingredient.id}
					className="btn badge badge-secondary text-text"
					onClick={() => onRemoveIngredient(ingredient.id)}
				>
					<img src={ingredient.image} alt="" className="size-4" />
					{ingredient.name}
					<X className="size-4" />
				</button>
			))}
		</article>
	);
}

export default IngredientsList;
