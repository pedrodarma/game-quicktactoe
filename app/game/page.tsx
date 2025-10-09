'use client';

import { GameProvider } from '@providers';
import { Board, Footer, GameHeader } from '@components';
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
		<div className="flex flex-col h-dvh px-8 pb-20 gap-1 sm:p-20 sm:pt-10">
			{hash && hash.length > 0 && (
				<GameProvider key={'provider' + hash} hash={hash}>
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
