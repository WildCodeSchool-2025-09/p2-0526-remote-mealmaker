import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ChefHat } from "lucide-react";
import Navbar from "../components/NavBar";

type RecipeIngredient = {
	id: number;
	name: string;
	image: string;
};

type RecipeStep = {
	number: number;
	step: string;
	length?: { number: number; unit: string };
	ingredients: RecipeIngredient[];
};

type CookingRecipe = {
	title: string;
	analyzedInstructions: { steps: RecipeStep[] }[];
};

function CookingMode() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<CookingRecipe>();
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	useEffect(() => {
		const myApiKey = import.meta.env.VITE_API_URL;

		fetch(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((data) => setRecipe(data));
	}, [id]);

	const steps = recipe?.analyzedInstructions[0]?.steps ?? [];

	if (!recipe) {
		return <p>Chargement...</p>;
	}

	if (steps.length === 0) {
		return <p>Le mode cuisine n'est pas disponible pour cette recette.</p>;
	}
	const currentStep = steps[currentStepIndex];
	const previousStep = () => {
		setCurrentStepIndex((actualIndex) => actualIndex - 1);
	};
	const nextStep = () => {
		setCurrentStepIndex((actualIndex) => actualIndex + 1);
	};

	return (
		<section className="p-8">
			<article>
				<h1 className="text-3xl  font-heading font-bold ">{recipe?.title}</h1>
				<p>
					Étape {currentStep.number} / {steps.length}
				</p>
				<progress
					className="progress progress-secondary w-full"
					value={currentStepIndex + 1}
					max={steps.length}
				/>
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
				</div>{" "}
				<p>{currentStep.step}</p>
			</article>
			<article>
				<button
					type="button"
					className="btn btn-block btn-primary btn-xl"
					onClick={previousStep}
					disabled={currentStepIndex === 0}
				>
					Etape Précédente
				</button>
				<button
					type="button"
					className="btn btn-block btn-primary btn-xl"
					onClick={nextStep}
					disabled={currentStepIndex === steps.length - 1}
				>
					Etape Suivante
				</button>
			</article>
			<Navbar />
		</section>
	);
}

export default CookingMode;
