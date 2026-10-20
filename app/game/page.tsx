'use client';

import { GameProvider } from '@providers';
import { ChatDock, GameHeader, GameScreen } from '@components';
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

export default function Game() {
	const pathname = usePathname();
	const params = useParams();

	const [hash, setHash] = useState<string>();

	useEffect(() => {
		_initialize();

		return () => {
			setHash(undefined);
		};
	}, [pathname, params]);

	function _initialize() {
		const hashFragment = window?.location.hash;

		const _hash = hashFragment.replace('#', '');

		if (!_hash || _hash.length === 0) return;

		setHash(_hash);
	}

	return (
		<div className="mx-auto flex min-h-dvh w-full max-w-[1376px] flex-col px-5 pt-5 pb-6 lg:px-8 lg:pb-8">
			{hash && hash.length > 0 && (
				<GameProvider key={'provider' + hash} hash={hash}>
					<GameHeader />
					<main className="flex flex-1 gap-6 pt-5 lg:pt-6">
						<section
							aria-label="Game"
							className="@container flex min-w-0 flex-1 flex-col lg:rounded-[28px] lg:border lg:border-line lg:bg-surface/60 lg:px-6 lg:py-10">
							<GameScreen key={'game' + hash} />
						</section>
						<ChatDock />
					</main>
				</GameProvider>
			)}
		</div>
	);
}
