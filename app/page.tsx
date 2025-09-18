'use client';

import { Footer, MainHeader, MainMenu, SquaredBackground } from '@components';

export default function Home() {
	return (
		// <div className="flex flex-col h-dvh px-8 pb-20 gap-16 sm:p-20 sm:pt-10">
		<div className="flex flex-col items-center justify-items-center h-dvh px-8 pb-20 gap-16 sm:p-20 sm:pt-10">
			<div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
				<SquaredBackground hoverFillColor="#ffffff" borderColor="#ffffff" />
			</div>
			<MainHeader />
			<main className="flex items-center grow pb-20">
				<MainMenu />
			</main>
			<Footer />
		</div>
	);
}
