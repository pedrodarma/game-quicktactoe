'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon, Logo } from '@design_system';
import { useAppContext } from '@providers';
import { ChatButton } from '../chat';
import { HowToPlay } from '../how_to_play';
import { ConnectionStatusView } from './views/connection-status.view';
import { ThemeSwitch } from './views/theme-switch.view';

export const GITHUB_URL = 'https://github.com/pedrodarma/game-quicktactoe';

export function MainHeader() {
	const { websocketState } = useAppContext();

	return (
		<header className="flex h-11 items-center justify-between gap-3 lg:h-auto lg:flex-wrap lg:gap-4">
			<div className="flex items-center gap-2.5">
				<Link href="/" aria-label="QuickTacToe home" className="flex min-h-11 items-center">
					<Logo
						markClassName="lg:size-9"
						wordmarkClassName="lg:text-xl"
						className="lg:gap-3"
					/>
				</Link>
				<ConnectionStatusView
					websocketState={websocketState}
					variant="dot"
					className="flex lg:hidden"
				/>
			</div>

			<nav aria-label="Main" className="flex items-center gap-2 lg:gap-1.5">
				<ConnectionStatusView
					websocketState={websocketState}
					className="mr-1.5 hidden lg:inline-flex"
				/>
				<HowToPlay className="hidden px-3.5 lg:inline-flex" />
				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="hidden h-11 items-center gap-2 rounded-[14px] px-3.5 text-sm font-semibold text-ink-2 transition-colors hover:text-ink lg:inline-flex">
					<GithubIcon />
					<span>GitHub</span>
					<ArrowUpRight aria-hidden="true" className="size-3.5" />
					<span className="sr-only">(opens in a new tab)</span>
				</a>
				<ChatButton />
				<ThemeSwitch />
			</nav>
		</header>
	);
}
