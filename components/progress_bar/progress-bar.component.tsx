'use client';

import { useEffect, useState } from 'react';

interface Props {
	duration: number;
	onFinish: () => void;
}

export default function ProgressBar({ duration, onFinish }: Props) {
	const [timeLeft, setTimeLeft] = useState(duration);

	useEffect(() => {
		if (timeLeft <= 0) {
			onFinish();
			return;
		}

		const interval = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 0.1 : 0));
		}, 100);

		return () => clearInterval(interval);
	}, [timeLeft, onFinish]);

	const progress = (timeLeft / duration) * 100;
	const color =
		progress > 60
			? 'bg-green-500'
			: progress > 30
			? 'bg-yellow-500'
			: 'bg-red-500';

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="relative h-3 bg-gray-300 rounded-full overflow-hidden">
				{/* <div
					className="absolute top-0 left-0 h-full bg-green-500 transition-[width] duration-100 ease-linear"
					style={{ width: `${progress}%` }}
				/> */}
				<div
					className={`absolute top-0 left-0 h-full ${color} transition-all duration-100 ease-linear`}
					style={{ width: `${progress}%` }}
				/>
			</div>
			{/* <div className="text-center text-sm text-gray-700 mt-1">
				{timeLeft.toFixed(1)}s
			</div> */}
		</div>
	);
}
