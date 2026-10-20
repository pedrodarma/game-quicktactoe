'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
	/** Seconds per move. */
	duration: number;
	/** The clock only runs while the game is being played. */
	running: boolean;
	/** Restarts the clock whenever it changes (e.g. the current turn). */
	resetKey?: string;
	onExpire: () => void;
}

/**
 * Per-move countdown. Returns the seconds left (0.1s resolution) and calls
 * `onExpire` once when the clock hits zero.
 */
export function useMoveTimer({ duration, running, resetKey, onExpire }: Props) {
	const [timeLeft, setTimeLeft] = useState(duration);
	const onExpireRef = useRef(onExpire);
	onExpireRef.current = onExpire;

	useEffect(() => {
		setTimeLeft(duration);
		if (!running) return;

		const startedAt = Date.now();
		let expired = false;

		const interval = setInterval(() => {
			const left = Math.max(0, duration - (Date.now() - startedAt) / 1000);
			setTimeLeft(left);

			if (left <= 0 && !expired) {
				expired = true;
				clearInterval(interval);
				onExpireRef.current();
			}
		}, 100);

		return () => clearInterval(interval);
	}, [duration, running, resetKey]);

	return timeLeft;
}
