import { useCallback, useEffect, useRef, useState } from "react";

type NoiseDetectionStatus = "idle" | "requesting" | "listening" | "error";
type NoiseDetectionErrorReason =
	| "not-supported"
	| "permission-denied"
	| "no-microphone"
	| "unknown";

type NoiseDetectionOptions = {
	threshold?: number;
	cooldownMs?: number;
};

function useNoiseDetection(
	onNoiseDetected: () => void,
	options?: NoiseDetectionOptions,
) {
	const threshold = options?.threshold ?? 0.12;
	const cooldownMs = options?.cooldownMs ?? 1500;

	const [status, setStatus] = useState<NoiseDetectionStatus>("idle");
	const [errorReason, setErrorReason] =
		useState<NoiseDetectionErrorReason | null>(null);

	const onNoiseDetectedRef = useRef(onNoiseDetected);
	onNoiseDetectedRef.current = onNoiseDetected;

	const streamRef = useRef<MediaStream | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const rafIdRef = useRef<number | null>(null);
	const wasAboveThresholdRef = useRef(false);
	const lastTriggerAtRef = useRef(0);

	const stopListening = useCallback(() => {
		if (rafIdRef.current !== null) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}

		for (const track of streamRef.current?.getTracks() ?? []) {
			track.stop();
		}
		streamRef.current = null;

		if (audioContextRef.current && audioContextRef.current.state !== "closed") {
			audioContextRef.current.close().catch(() => {});
		}
		audioContextRef.current = null;
		analyserRef.current = null;
		wasAboveThresholdRef.current = false;

		setStatus((current) => (current === "error" ? current : "idle"));
	}, []);

	const startListening = useCallback(async () => {
		const hasSupport =
			!!navigator.mediaDevices?.getUserMedia &&
			typeof AudioContext !== "undefined";

		if (!hasSupport) {
			setStatus("error");
			setErrorReason("not-supported");
			return;
		}

		setStatus("requesting");
		setErrorReason(null);

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			streamRef.current = stream;

			const audioContext = new AudioContext();
			audioContextRef.current = audioContext;

			const source = audioContext.createMediaStreamSource(stream);
			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 512;
			source.connect(analyser);
			analyserRef.current = analyser;

			const data = new Uint8Array(analyser.fftSize);

			const tick = () => {
				analyser.getByteTimeDomainData(data);

				let sumSquares = 0;
				for (const sample of data) {
					const normalized = (sample - 128) / 128;
					sumSquares += normalized * normalized;
				}
				const rms = Math.sqrt(sumSquares / data.length);

				const isAboveThreshold = rms > threshold;
				const now = performance.now();

				if (isAboveThreshold && !wasAboveThresholdRef.current) {
					if (now - lastTriggerAtRef.current > cooldownMs) {
						lastTriggerAtRef.current = now;
						onNoiseDetectedRef.current();
					}
				}
				wasAboveThresholdRef.current = isAboveThreshold;

				rafIdRef.current = requestAnimationFrame(tick);
			};

			rafIdRef.current = requestAnimationFrame(tick);
			setStatus("listening");
		} catch (error) {
			setStatus("error");
			if (error instanceof DOMException) {
				if (
					error.name === "NotAllowedError" ||
					error.name === "SecurityError"
				) {
					setErrorReason("permission-denied");
				} else if (error.name === "NotFoundError") {
					setErrorReason("no-microphone");
				} else {
					setErrorReason("unknown");
				}
			} else {
				setErrorReason("unknown");
			}
		}
	}, [threshold, cooldownMs]);

	const toggleListening = useCallback(() => {
		if (status === "listening") {
			stopListening();
		} else if (status !== "requesting") {
			startListening();
		}
	}, [status, startListening, stopListening]);

	useEffect(() => {
		return () => stopListening();
	}, [stopListening]);

	return { status, errorReason, toggleListening };
}

export default useNoiseDetection;
