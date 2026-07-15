function StepNavigation({
	currentStepIndex,
	stepsCount,
	onPrevious,
	onNext,
	onFinish,
}: {
	currentStepIndex: number;
	stepsCount: number;
	onPrevious: () => void;
	onNext: () => void;
	onFinish: () => void;
}) {
	const isLastStep = currentStepIndex === stepsCount - 1;

	const handleNextOrFinish = () => {
		if (isLastStep) {
			onFinish();
		} else {
			onNext();
		}
	};

	return (
		<article className="mt-auto flex gap-4 mb-4">
			<button
				type="button"
				className="btn btn-primary shadow-xl/20 btn-xl flex-1"
				onClick={onPrevious}
				disabled={currentStepIndex === 0}
			>
				Précédent
			</button>
			<button
				type="button"
				className="btn btn-primary shadow-xl/20 btn-xl flex-1"
				onClick={handleNextOrFinish}
			>
				{isLastStep ? "Terminer" : "Suivant"}
			</button>
		</article>
	);
}

export default StepNavigation;
