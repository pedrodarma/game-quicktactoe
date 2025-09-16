'use client';

import { GameProvider } from '@providers';
import { Board, Footer, Header } from '@components';

export default function Game() {
	return (
		<GameProvider>
			<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-dvh p-8 pb-20 gap-16 sm:p-20">
				<Header />
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
					<Board />
				</main>
				<Footer />
			</div>
		</GameProvider>
	);
}
