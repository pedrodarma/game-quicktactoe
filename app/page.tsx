'use client';

import { Footer, MainHeader, SquaredBackground } from '@components';
import { LargeText, PrimaryButton, SecondaryButton } from '@design_system';

export default function Home() {
	return (
		// <div className="flex flex-col h-dvh px-8 pb-20 gap-16 sm:p-20 sm:pt-10">
		<div className="flex flex-col items-center justify-items-center h-dvh px-8 pb-20 gap-16 sm:p-20 sm:pt-10">
			<div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
				<SquaredBackground hoverFillColor="#ffffff" borderColor="#ffffff" />
			</div>
			<MainHeader />
			<main className="flex items-center grow pb-20">
				<div className="flex flex-col gap-4 items-center">
					<PrimaryButton>
						<div className="mx-8">
							<LargeText>Play</LargeText>
						</div>
					</PrimaryButton>
					<SecondaryButton>
						<div className="mx-8">
							<LargeText>Play</LargeText>
						</div>
					</SecondaryButton>
					{/* <div className="flex items-center scale-100 hover:scale-120 transition-all duration-300">
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
					</Link> */}
				</div>
			</main>
			<Footer />
		</div>
	);
}
