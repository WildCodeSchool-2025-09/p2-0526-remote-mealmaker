import { X } from "lucide-react";

function IngredientsList() {
	return (
		<article className=" flex flex-wrap justify-center gap-2 p-2 rounded-box border  border-solid border-primary bg-surface">
			<p className="w-full text-sage font-bold">Ma liste actuelle :</p>
			<div className="btn badge badge-secondary text-text">
				Carotte <X className="size-4" />
			</div>
		</article>
	);
}

export default IngredientsList;
