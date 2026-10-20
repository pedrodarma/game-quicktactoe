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
	// Time left, tagged with the turn it belongs to, so a new turn shows a
	// full clock straight away instead of the previous turn's value.
	const [tick, setTick] = useState<{ key?: string; left: number }>({
		left: duration,
	});
	const onExpireRef = useRef(onExpire);

	useEffect(() => {
		onExpireRef.current = onExpire;
	});

	useEffect(() => {
		if (!running) return;

		const startedAt = Date.now();
		let expired = false;

		const interval = setInterval(() => {
			const left = Math.max(0, duration - (Date.now() - startedAt) / 1000);
			setTick({ key: resetKey, left });

			if (left <= 0 && !expired) {
				expired = true;
				clearInterval(interval);
				onExpireRef.current();
			}
		}, 100);

		return () => clearInterval(interval);
	}, [duration, running, resetKey]);

	return running && tick.key === resetKey ? tick.left : duration;
}
