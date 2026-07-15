import type { RecipeStep } from "../../types/recipe.types";

function ProgressBar({
	currentStep,
	steps,
	currentStepIndex,
}: {
	currentStep: RecipeStep;
	steps: RecipeStep[];
	currentStepIndex: number;
}) {
	return (
		<>
			<p className="mt-8 text-xl font-bold">
				Étape {currentStep.number} / {steps.length}
			</p>
			<progress
				className="progress w-full mt-2 mb-8 [&::-webkit-progress-bar]:bg-neutral-content/20 [&::-webkit-progress-value]:bg-neutral-content [&::-moz-progress-bar]:bg-neutral-content"
				value={currentStepIndex + 1}
				max={steps.length}
			/>
		</>
	);
}

export default ProgressBar;
