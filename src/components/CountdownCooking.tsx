import { useEffect, useRef, useState } from "react";

interface MinuteurProps {
	initialTimeMs?: number;
	onTimerEnd?: () => void;
	onStatusChange?: (isRunning: boolean) => void;
}

function CountdownCooking({
	initialTimeMs = 30000,
	onTimerEnd,
	onStatusChange,
}: MinuteurProps) {
	const [remainingTime, setRemainingTime] = useState(initialTimeMs);
	const [isRunning, setIsRunning] = useState(false);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const targetTimeRef = useRef<number>(0);

	useEffect(() => {
		if (onStatusChange) {
			onStatusChange(isRunning);
		}
	}, [isRunning, onStatusChange]);

	useEffect(() => {
		if (!isRunning) {
			setRemainingTime(initialTimeMs);
			if (intervalRef.current) clearInterval(intervalRef.current);
		}
	}, [initialTimeMs, isRunning]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	const formatTime = (time: number) => {
		const safeTime = Math.max(0, time);
		const date = new Date(safeTime);
		const hours = date.getUTCHours().toString().padStart(2, "0");
		const minutes = date.getUTCMinutes().toString().padStart(2, "0");
		const seconds = date.getUTCSeconds().toString().padStart(2, "0");

		return `${hours}:${minutes}:${seconds}`;
	};

	const playPauseTimer = () => {
		if (isRunning) {
			setIsRunning(false);
			if (intervalRef.current) clearInterval(intervalRef.current as number);
		} else {
			if (remainingTime <= 0) return;
			setIsRunning(true);
			targetTimeRef.current = Date.now() + remainingTime;

			intervalRef.current = setInterval(() => {
				const timeLeft = targetTimeRef.current - Date.now();

				if (timeLeft <= 0) {
					setRemainingTime(0);
					setIsRunning(false);

					if (intervalRef.current) clearInterval(intervalRef.current as number);

					if (onTimerEnd) onTimerEnd();
				} else {
					setRemainingTime(timeLeft);
				}
			}, 1000);
		}
	};

	const handleReset = () => {
		setIsRunning(false);
		if (intervalRef.current) clearInterval(intervalRef.current as number);
		setRemainingTime(initialTimeMs);
	};

	const isPaused =
		!isRunning && remainingTime > 0 && remainingTime < initialTimeMs;

	return (
		<>
			<article className="w-auto flex justify-center flex-col gap-2 p-4 border-2 border-primary rounded-2xl bg-background text-primary">
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
		</>
	);
}

export default CountdownCooking;
