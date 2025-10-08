'use client';

import { GameProvider, useAppContext } from '@providers';
import { Board, Footer, GameHeader, LoadingGame } from '@components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Game() {
	const { userState, websocketState } = useAppContext();
	const router = useRouter();

	const [hash, setHash] = useState<string>();
	const [mounted, setMounted] = useState<boolean>(false);

	const isAgainstBot = hash?.startsWith('bot_');
	const isLocalPvP = hash?.startsWith('pvp_');

	const gameMode = isAgainstBot
		? 'local_bot'
		: isLocalPvP
		? 'local_pvp'
		: 'online';

	useEffect(() => {
		const hashFragment = window?.location.hash;

		const _hash = hashFragment.replace('#', '');

		if (!_hash || _hash.length === 0) return;

		setHash(_hash);

		setMounted(true);

		return () => {
			setMounted(false);
		};
	}, [router]);

	// if (!hash || hash.length === 0 || !mounted) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<div className="flex flex-col h-dvh px-8 pb-20 gap-1 sm:p-20 sm:pt-10">
			{!hash ||
				hash.length === 0 ||
				(!mounted && (
					<main className="flex flex-col items-center justify-center mt-8 grow">
						<div
							className={`flex flex-col justify-center items-center gap-1 transition-all ${
								!hash || hash.length === 0 || !mounted
									? 'block scale-130 sm:scale-190'
									: // : 'block scale-130 sm:scale-190'
									  'hidden scale-10'
							}`}>
							<LoadingGame />
						</div>
					</main>
				))}
			{hash && hash.length > 0 && mounted && (
				<GameProvider key={'provider' + hash} hash={hash!}>
					<GameHeader />
					<main className="flex flex-col grow row-start-2 items-center justify-center">
						<Board key={'board' + hash} />
					</main>
					<Footer />
				</GameProvider>
			)}
		</div>
	);
}
