import { useCallback, useEffect, useRef, useState } from "react";

type RecipeStepLength = {
	number: number;
	unit: string;
};

type RecipeIngredient = {
	id: number;
	name: string;
	image: string;
};

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

// FONCTION PURE : Calcul de la durée de l'étape courante en millisecondes
const getStepTimeMs = (step?: RecipeStep): number => {
	if (!step?.length?.number) return 0;

	return step.length.unit === "minutes"
		? step.length.number * 60 * 1000
		: step.length.number * 1000;
};

// FORMATAGE : millisecondes -> HH:MM:SS
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
	const [remainingTime, setRemainingTime] = useState(0);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const targetTimeRef = useRef<number>(0);
	// On mémorise l'étape associée au minuteur en cours (pour le rappel de fin)
	const timerStepTextRef = useRef<string>("");

	// Durée de l'étape courante (valeur dérivée, pas besoin d'état)
	const initialTimeMs = getStepTimeMs(currentStep);

	// useCallback : référence stable pour pouvoir l'utiliser dans les useEffect
	const clearTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	// SYNCHRONISATION : quand l'étape change et que le minuteur ne tourne pas,
	// on réinitialise l'affichage avec la durée de la nouvelle étape
	// On mémorise le numéro de la dernière étape synchronisée
	const lastSyncedStepRef = useRef<number | null>(null);

	// SYNCHRONISATION : uniquement quand l'ÉTAPE change (pas quand on met pause)
	useEffect(() => {
		const stepChanged = lastSyncedStepRef.current !== currentStep?.number;

		if (stepChanged && !isRunning) {
			lastSyncedStepRef.current = currentStep?.number ?? null;
			setRemainingTime(initialTimeMs);
			timerStepTextRef.current = currentStep?.step ?? "";
			clearTimer();
		}
	}, [initialTimeMs, isRunning, currentStep, clearTimer]);

	// NETTOYAGE : on coupe l'intervalle au démontage du composant
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
		targetTimeRef.current = Date.now() + remainingTime;

		intervalRef.current = setInterval(() => {
			const timeLeft = targetTimeRef.current - Date.now();

			if (timeLeft <= 0) {
				setRemainingTime(0);
				stopTimer();
				onTimerEnd?.(timerStepTextRef.current);
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
		setRemainingTime(initialTimeMs);
	};

	const isPaused =
		!isRunning && remainingTime > 0 && remainingTime < initialTimeMs;

	// AFFICHAGE CONDITIONNEL : rien si l'étape n'a pas de durée
	// et qu'aucun minuteur n'est en cours
	if (initialTimeMs <= 0 && !isRunning) {
		return null;
	}

	return (
		<section className="w-full flex justify-center items-center mt-6">
			<article className="w-auto flex justify-center flex-col gap-2 p-4 border-2 border-primary rounded-2xl bg-background  font-bold text-base-content">
				<h1 id="display" className="text-center">
					Minuteur
				</h1>
				<p className="text-center">{formatTime(remainingTime)}</p>
				<div className="w-full flex justify-around gap-2">
					<button
						onClick={playPauseTimer}
						type="button"
						disabled={remainingTime === 0}
						className={`btn btn-sm ${isRunning ? "btn-warning" : "btn-success"} ${isPaused ? "animate-pulse" : ""}`}
					>
						{isRunning ? "Pause" : isPaused ? "Reprendre" : "Démarrer"}
					</button>
					<button
						onClick={handleReset}
						type="button"
						className="btn btn-sm btn-error"
					>
						Réinitialiser
					</button>
				</div>
			</article>
		</section>
	);
}

export default TimerCookModule;
