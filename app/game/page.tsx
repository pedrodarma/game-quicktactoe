'use client';

import { GameProvider, useAppContext } from '@providers';
import { Board, Footer, GameHeader } from '@components';
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

	if (!hash || hash.length === 0 || !mounted) {
		return <div>Loading...</div>;
	}

	return (
		<GameProvider key={'provider' + hash} hash={hash}>
			<div className="flex flex-col h-dvh px-8 pb-20 gap-1 sm:p-20 sm:pt-10">
				<GameHeader />
				<main className="flex flex-col grow row-start-2 items-center justify-center">
					<Board key={'board' + hash} />
				</main>
				<Footer />
			</div>
		</GameProvider>
	);
}
