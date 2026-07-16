import { useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/NavBar";
import useRecipeById from "../hooks/useRecipeById";
import QuitButton from "../components/CookingMode/QuitButton";
import ProgressBar from "../components/CookingMode/ProgressBar";
import IngredientsView from "../components/CookingMode/IngredientsView";
import StepNavigation from "../components/CookingMode/StepNavigation";
import TimerCookModule from "../components/CookingMode/TimerCookModule";
import CompletedRecipe from "../components/CookingMode/CompletedRecipe";

function CookingMode() {
	const { id } = useParams();
	const { recipe } = useRecipeById(Number(id));
	const [recipeCompleted, setRecipeCompleted] = useState(false);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const steps = recipe?.analyzedInstructions[0]?.steps ?? [];

	if (!recipe) {
		return <p>Loading...</p>;
	}

	if (steps.length === 0) {
		return <p>Cooking mode is not available for this recipe.</p>;
	}

	if (recipeCompleted) {
		return <CompletedRecipe recipe={recipe} id={id} />;
	}

	const currentStep = steps[currentStepIndex];

	const previousStep = () => {
		setCurrentStepIndex((actualIndex) => actualIndex - 1);
	};
	const nextStep = () => {
		setCurrentStepIndex((actualIndex) => actualIndex + 1);
	};

	return (
		<section className="min-h-screen flex flex-col p-8 bg-[#5e4b00] bg-[url('/bg-wood.png')] text-neutral-content">
			<QuitButton id={id} />

			<article>
				<h1 className="text-3xl font-heading font-bold">{recipe.title}</h1>

				<ProgressBar
					currentStep={currentStep}
					steps={steps}
					currentStepIndex={currentStepIndex}
				/>

				<IngredientsView currentStep={currentStep} />

				<TimerCookModule currentStep={currentStep} />

				<p className="text-lg leading-relaxed mt-4">{currentStep.step}</p>
			</article>

			<StepNavigation
				currentStepIndex={currentStepIndex}
				stepsCount={steps.length}
				onPrevious={previousStep}
				onNext={nextStep}
				onFinish={() => setRecipeCompleted(true)}
			/>

			<div className="h-16"> </div>
			<Navbar />
		</section>
	);
}

export default CookingMode;
