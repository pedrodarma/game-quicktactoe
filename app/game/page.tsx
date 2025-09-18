'use client';

import { GameProvider } from '@providers';
import { Board, Footer, Header } from '@components';

export default function Game() {
	return (
		<GameProvider>
			<div className="flex flex-col h-dvh px-8 pb-20 gap-16 sm:p-20 sm:pt-10">
				<Header />
				<main className="flex flex-col grow gap-[32px] row-start-2 items-center sm:items-start">
					<Board />
				</main>
				<Footer />
			</div>
		</GameProvider>
	);
}
