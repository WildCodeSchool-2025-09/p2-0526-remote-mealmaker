import { useState } from "react";
import { ChefHat } from "lucide-react";
import type { RecipeStep } from "../../types/recipe.types";

function IngredientsView({ currentStep }: { currentStep: RecipeStep }) {
	const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

	const handleImageError = (ingredientId: number) => {
		setBrokenImages((previous) => new Set(previous).add(ingredientId));
	};

	return (
		<div className="flex flex-wrap gap-2 py-4">
			{currentStep.ingredients.length > 0 ? (
				currentStep.ingredients.map((ingredient) =>
					brokenImages.has(ingredient.id) ? (
						<div
							key={`${ingredient.id}-${ingredient.name}`}
							className="w-24 h-24 rounded-lg bg-base-200 flex flex-col items-center justify-center border-2 border-sage font-bold"
						>
							<ChefHat className="w-24 h-24 text-secondary" />
							<span className="text-xs text-center leading-tight line-clamp-2 text-base-content">
								{ingredient.name}
							</span>
						</div>
					) : (
						<img
							key={`${ingredient.id}-${ingredient.name}`}
							src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
							alt={ingredient.name}
							className="w-24 h-24 rounded-lg object-contain p-2 border-2 border-sage bg-base-200"
							onError={() => handleImageError(ingredient.id)}
						/>
					),
				)
			) : (
				<div className="w-24 h-24 rounded-lg bg-base-200 flex items-center justify-center border-2 border-sage">
					<ChefHat className="w-24 h-24 text-secondary" />
				</div>
			)}
		</div>
	);
}

export default IngredientsView;
