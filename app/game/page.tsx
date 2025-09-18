'use client';

import { GameProvider, useAppContext } from '@providers';
import { Board, Footer, GameHeader } from '@components';
import { useEffect, useState } from 'react';

export default function Game() {
	const { userState, websocketState } = useAppContext();
	// const router = useRouter();
	const [hash, setHash] = useState<string>();
	// // router.
	useEffect(() => {
		// URL completa
		const fullUrl = window?.location.href;

		// Apenas o pathname (/game/abc123)
		const path = window?.location.pathname;

		// Apenas a query string (?hash=value)
		const query = window?.location.search;

		// Apenas o hash (#top)
		const hashFragment = window?.location.hash;

		// console.log({ fullUrl, path, query, hashFragment });
		const _hash = hashFragment.replace('#', '');
		setHash(_hash);
		// router.
		//
	}, []);

	if (!hash || hash.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<GameProvider
			hash={hash}
			userId={userState?.id || websocketState.current.userId || ''}>
			<div className="flex flex-col h-dvh px-8 pb-20 gap-16 sm:p-20 sm:pt-10">
				<GameHeader />
				<main className="flex flex-col grow gap-[32px] row-start-2 items-center sm:items-start">
					<Board />
				</main>
				<Footer />
			</div>
		</GameProvider>
	);
}
