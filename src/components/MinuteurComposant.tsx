import { useRef, useState } from "react";

function MinuteurComposant() {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const startTimeRef = useRef<number>(0);

	const formatTime = (time: number) => {
		const date = new Date(time);
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
			setIsRunning(true);
			startTimeRef.current = Date.now() - elapsedTime;

			intervalRef.current = setInterval(() => {
				setElapsedTime(Date.now() - startTimeRef.current);
			}, 1000);
		}
	};

	const handleReset = () => {
		setIsRunning(false);
		if (intervalRef.current) clearInterval(intervalRef.current as number);
		setElapsedTime(0);
	};

	const isPaused = !isRunning && elapsedTime > 0;

	return (
		<>
			<article className="w-2/3 flex justify-center flex-col gap-4 p-4 border-2 border-primary rounded-2xl bg-surface">
				<h1 id="display" className="text-center">
					Minuteur: {formatTime(elapsedTime)}
				</h1>
				<div className="w-full flex justify-around gap-2">
					<button
						onClick={playPauseTimer}
						type="button"
						className={`btn btn-sm ${isRunning ? "btn-warning" : "btn-success"} ${isPaused ? "animate-pulse" : ""}`}
					>
						{isRunning ? "Pause" : isPaused ? "Reprendre" : "Démarrer"}
					</button>
					<button
						onClick={handleReset}
						type="button"
						className="btn btn-sm btn-error"
					>
						Arreter/reset
					</button>
				</div>
			</article>
		</>
	);
}

export default MinuteurComposant;
