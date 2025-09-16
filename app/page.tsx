'use client';

import { Footer, SquaredBackground } from '@components';
import Link from 'next/link';
import { OrbitProgress } from 'react-loading-indicators';

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
				<SquaredBackground />
			</div>
			<div>
				<h1 className="text-4xl font-bold">QuickTacToe</h1>
			</div>
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<div className="flex gap-4 items-center flex-col">
					<div className="flex gap-2 items-center scale-100 hover:scale-120 transition-all duration-300">
						<OrbitProgress
							variant="track-disc"
							speedPlus={-4}
							dense
							easing="linear"
							size="large"
						/>
					</div>
					<p>Waiting for opponent...</p>
					<Link href="/game" className="text-blue-600 hover:underline">
						Go to chat
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	);
}
