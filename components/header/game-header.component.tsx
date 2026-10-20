'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
	buttonClasses,
	iconButtonClasses,
	Logo,
	Wordmark,
} from '@design_system';
import { useGameContext } from '@providers';
import { ChatButton } from '../chat';
import { gameModeFromHash, MODE_LABEL } from '../board/game.utils';
import { ConnectionStatusView } from './views/connection-status.view';
import { ThemeSwitch } from './views/theme-switch.view';

interface ViewProps {
	modeLabel: string;
	websocketState: { current: { status: string } };
}

export function GameHeaderView({ modeLabel, websocketState }: ViewProps) {
	return (
		<header>
			{/* Phones and tablets */}
			<div className="flex h-11 items-center justify-between gap-3 lg:hidden">
				<Link
					href="/"
					aria-label="Leave game"
					className={iconButtonClasses('surface', 'text-ink')}>
					<ArrowLeft aria-hidden="true" className="size-5" />
				</Link>
				<div className="flex min-w-0 flex-col items-center gap-[3px]">
					<Wordmark className="text-[15px]" />
					<ConnectionStatusView
						websocketState={websocketState}
						variant="inline"
						label={modeLabel}
					/>
				</div>
				<ChatButton className="text-ink" />
			</div>

			{/* Desktop */}
			<div className="hidden flex-wrap items-center justify-between gap-4 lg:flex">
				<div className="flex items-center gap-3">
					<Link
						href="/"
						aria-label="QuickTacToe home"
						className="flex min-h-11 items-center">
						<Logo
							markClassName="size-9"
							wordmarkClassName="text-xl"
							className="gap-3"
						/>
					</Link>
					<ConnectionStatusView
						websocketState={websocketState}
						label={modeLabel}
					/>
				</div>
				<div className="flex items-center gap-2.5">
					<ThemeSwitch />
					<ChatButton />
					<Link
						href="/"
						className={buttonClasses(
							'secondary',
							'md',
							'h-11 rounded-[14px] px-4 text-sm',
						)}>
						<ArrowLeft aria-hidden="true" className="size-[18px]" />
						Leave game
					</Link>
				</div>
			</div>
		</header>
	);
}

export function GameHeader() {
	const { gameState, websocketState } = useGameContext();

	return (
		<GameHeaderView
			modeLabel={MODE_LABEL[gameModeFromHash(gameState.hash)]}
			websocketState={websocketState}
		/>
	);
}
