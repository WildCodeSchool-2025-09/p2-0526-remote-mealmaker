import { useCallback, useEffect, useRef, useState } from "react";

type RecipeStepLength = { number: number; unit: string };
type RecipeIngredient = { id: number; name: string; image: string };
type RecipeStep = {
	number: number;
	step: string;
	length?: RecipeStepLength;
	ingredients: RecipeIngredient[];
};
type TimerCookModuleProps = {
	currentStep: RecipeStep;
	onTimerEnd?: (stepText: string) => void;
};

const getStepTimeMs = (step?: RecipeStep): number => {
	if (!step?.length?.number) return 0;
	return step.length.unit === "minutes"
		? step.length.number * 60 * 1000
		: step.length.number * 1000;
};

const formatTime = (time: number): string => {
	const safeTime = Math.max(0, time);
	const date = new Date(safeTime);
	const hours = date.getUTCHours().toString().padStart(2, "0");
	const minutes = date.getUTCMinutes().toString().padStart(2, "0");
	const seconds = date.getUTCSeconds().toString().padStart(2, "0");
	return `${hours}:${minutes}:${seconds}`;
};

function TimerCookModule({ currentStep, onTimerEnd }: TimerCookModuleProps) {
	const [isRunning, setIsRunning] = useState(false);
	const [isEngaged, setIsEngaged] = useState(false);
	const [remainingTime, setRemainingTime] = useState(0);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const targetTimeRef = useRef<number>(0);
	const timerStepTextRef = useRef<string>("");
	const initialTimeMs = getStepTimeMs(currentStep);
	const timerModalRef = useRef<HTMLDialogElement>(null);

	const clearTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const lastSyncedStepRef = useRef<number | null>(null);

	useEffect(() => {
		const stepChanged = lastSyncedStepRef.current !== currentStep?.number;

		if (stepChanged && !isEngaged) {
			lastSyncedStepRef.current = currentStep?.number ?? null;
			setRemainingTime(initialTimeMs);
			timerStepTextRef.current = currentStep?.step ?? "";
			clearTimer();
		}
	}, [initialTimeMs, isEngaged, currentStep, clearTimer]);

	useEffect(() => {
		return () => clearTimer();
	}, [clearTimer]);

	const stopTimer = () => {
		setIsRunning(false);
		clearTimer();
	};

	const startTimer = () => {
		if (remainingTime <= 0) return;

		setIsRunning(true);
		setIsEngaged(true);
		targetTimeRef.current = Date.now() + remainingTime;

		intervalRef.current = setInterval(() => {
			const timeLeft = targetTimeRef.current - Date.now();

			if (timeLeft <= 0) {
				setRemainingTime(0);
				stopTimer();
				onTimerEnd?.(timerStepTextRef.current);
				timerModalRef.current?.showModal();
			} else {
				setRemainingTime(timeLeft);
			}
		}, 1000);
	};

	const playPauseTimer = () => {
		if (isRunning) {
			stopTimer();
		} else {
			startTimer();
		}
	};

	const handleReset = () => {
		stopTimer();
		setIsEngaged(false);
		setRemainingTime(initialTimeMs);
	};

	const isPaused = isEngaged && !isRunning;

	const handleCloseModal = () => {
		timerModalRef.current?.close();
		setIsEngaged(false);
	};

	if (initialTimeMs <= 0 && !isEngaged) {
		return null;
	}

	return (
		<section className="w-full flex justify-center items-center mt-6">
			<dialog ref={timerModalRef} className="modal">
				<div className="modal-box text-base-content border-t-4 border-warning">
					<h3 className="font-bold text-lg">⏰ Cooking time is up !</h3>
					<p className="py-4">{timerStepTextRef.current}</p>
					<div className="modal-action">
						<button
							type="button"
							className="btn btn-primary"
							onClick={handleCloseModal}
						>
							OK
						</button>
					</div>
				</div>
			</dialog>

			<article className="w-auto flex justify-center flex-col gap-2 p-4 border-2 border-primary rounded-2xl bg-background font-bold text-base-content">
				<h1 id="display" className="text-center">
					Timer
				</h1>
				<p className="text-center">{formatTime(remainingTime)}</p>
				<div className="w-full flex justify-around gap-2">
					<button
						onClick={playPauseTimer}
						type="button"
						disabled={remainingTime === 0}
						className={`btn btn-sm ${isRunning ? "btn-warning" : "btn-success"} ${isPaused ? "animate-pulse" : ""}`}
					>
						{isRunning ? "Pause" : isPaused ? "Resume" : "Start"}
					</button>
					<button
						onClick={handleReset}
						type="button"
						className="btn btn-sm btn-error"
					>
						Reset
					</button>
				</div>
			</article>
		</section>
	);
}

export default TimerCookModule;
