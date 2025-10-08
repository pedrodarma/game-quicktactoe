'use client';

import { MediumTitle } from '@design_system';
import { GameStatusView } from './views/game-status.view';
import Link from 'next/link';
import { ThemeSwitch } from './views/theme-switch.view';

export function GameHeader() {
	return (
		<div className="flex flex-row items-center gap-1 w-full max-w-lg mx-auto z-1">
			<div className="w-full max-w-lg mx-auto">
				<Link href="/" className="py-4 flex gap-4 justify-start items-center">
					<MediumTitle>QuickTacToe</MediumTitle>

					<div>
						<GameStatusView />
					</div>
				</Link>
			</div>
			<div>
				<ThemeSwitch />
			</div>
		</div>
	);
}
