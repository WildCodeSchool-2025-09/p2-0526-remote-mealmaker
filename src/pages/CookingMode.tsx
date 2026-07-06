import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

type RecipeStep = {
	number: number;
	step: string;
	length?: { number: number; unit: string };
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
				<h1>Mode cuisine — {recipe?.title}</h1>
				<p>
					Étape {currentStep.number} / {steps.length}
				</p>
				<p>{currentStep.step}</p>
			</article>
			<article>
				<button
					type="button"
					className="btn btn-block btn-primary btn-xl"
					onClick={previousStep}
					disabled={currentStepIndex === 0}
				>
					{" "}
					Etape Précédente
				</button>
				<button
					type="button"
					className="btn btn-block btn-primary btn-xl"
					onClick={nextStep}
					disabled={currentStepIndex === steps.length - 1}
				>
					{" "}
					Etape Suivante
				</button>{" "}
			</article>
		</section>
	);
}

export default CookingMode;
