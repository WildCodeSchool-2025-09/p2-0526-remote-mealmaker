function IngredientsView() {
	return (
		<>
			<div className="flex flex-wrap gap-2 py-4">
				{currentStep.ingredients.length > 0 ? (
					currentStep.ingredients.map((ingredient) => (
						<img
							key={`${ingredient.id}-${ingredient.name}`}
							src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
							alt={ingredient.name}
							className="w-24 h-24 rounded-lg object-contain p-2 border-2 border-sage bg-base-200"
						/>
					))
				) : (
					<div className="w-24 h-24 rounded-lg bg-base-200 flex items-center justify-center border-2 border-sage">
						<ChefHat className="w-24 h-24 text-secondary" />
					</div>
				)}
			</div>
		</>
	);
}

export default IngredientsView;
