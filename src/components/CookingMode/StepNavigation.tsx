import { Mic, MicOff } from "lucide-react";
import useNoiseDetection from "../../hooks/useNoiseDetection";

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

	const { status, errorReason, toggleListening } =
		useNoiseDetection(handleNextOrFinish);

	const micLabel =
		status === "listening"
			? "Disable voice control"
			: status === "requesting"
				? "Requesting microphone access…"
				: status === "error"
					? errorReason === "permission-denied"
						? "Microphone permission denied"
						: "Voice control unavailable"
					: "Enable voice control";

	const micButtonClassName = `btn btn-circle ${
		status === "listening"
			? "btn-success animate-pulse"
			: status === "error"
				? "btn-error"
				: "btn-outline btn-primary"
	}`;

	return (
		<article className="mt-auto flex gap-4 mb-4">
			<button
				type="button"
				className={micButtonClassName}
				onClick={toggleListening}
				disabled={
					status === "requesting" ||
					(status === "error" && errorReason === "not-supported")
				}
				title={micLabel}
				aria-label={micLabel}
			>
				{status === "error" ? <MicOff size={20} /> : <Mic size={20} />}
			</button>
			<button
				type="button"
				className="btn btn-primary shadow-xl/20 btn-xl flex-1"
				onClick={onPrevious}
				disabled={currentStepIndex === 0}
			>
				Previous
			</button>
			<button
				type="button"
				className="btn btn-primary shadow-xl/20 btn-xl flex-1"
				onClick={handleNextOrFinish}
			>
				{isLastStep ? "Finish" : "Next"}
			</button>
		</article>
	);
}

export default StepNavigation;
