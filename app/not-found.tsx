'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
	buttonClasses,
	Logo,
	OMark,
	SecondaryButton,
} from '@design_system';
import { useAppContext } from '@providers';

export default function NotFound() {
	const { createGame } = useAppContext();
	const [isStarting, setIsStarting] = useState(false);

	async function _playNow() {
		setIsStarting(true);
		try {
			await createGame('online');
		} finally {
			setIsStarting(false);
		}
	}

	return (
		<div className="mx-auto flex min-h-dvh w-full max-w-[1376px] flex-col px-5 pt-5 pb-6 lg:px-8 lg:pb-18">
			<header className="flex h-11 items-center lg:h-auto">
				<Link
					href="/"
					aria-label="QuickTacToe home"
					className="flex min-h-11 items-center">
					<Logo
						markClassName="lg:size-9"
						wordmarkClassName="lg:text-xl"
						className="lg:gap-3"
					/>
				</Link>
			</header>

			<main className="flex flex-1 flex-col lg:items-center lg:justify-center">
				<div className="flex flex-1 flex-col justify-center gap-8 lg:w-full lg:max-w-[720px] lg:flex-none lg:items-center lg:gap-9 lg:text-center">
					<p
						aria-label="404"
						className="flex items-center justify-center gap-1.5 font-display text-[124px] leading-none font-extrabold tracking-[-0.04em] text-ink lg:gap-[0.05em] lg:text-[clamp(7rem,16vw,13rem)]">
						<span aria-hidden="true">4</span>
						<OMark strokeWidth={16} className="size-[0.82em] shrink-0" />
						<span aria-hidden="true">4</span>
					</p>

					<div className="flex w-full flex-col gap-2.5 rounded-[18px] border border-line bg-surface px-4 py-3.5 lg:w-[min(420px,100%)] lg:px-[18px]">
						<div className="flex items-center justify-between gap-3 font-mono text-xs font-bold tracking-[0.08em] uppercase">
							<span className="text-muted">Page not found</span>
							<span className="text-danger">0.0s</span>
						</div>
						<div aria-hidden="true" className="h-1.5 rounded-full bg-line" />
					</div>

					<div className="flex flex-col gap-2.5 lg:items-center lg:gap-3">
						<h1 className="font-display text-[28px] leading-[1.12] text-balance font-extrabold tracking-[-0.02em] text-ink lg:text-[clamp(1.75rem,3vw,2.5rem)] lg:leading-[1.1]">
							This page ran out of time.
						</h1>
						<p className="text-base leading-[1.45] text-ink-2 lg:text-lg lg:leading-[1.5]">
							Sorry, the page you’re looking for doesn’t exist.
						</p>
					</div>

					<div className="hidden flex-wrap justify-center gap-3 lg:flex">
						<Link
							href="/"
							className={buttonClasses('primary', 'lg', 'w-[240px]')}>
							<ArrowLeft aria-hidden="true" className="size-5" />
							Go back home
						</Link>
						<SecondaryButton
							size="lg"
							onClick={_playNow}
							isLoading={isStarting}
							className="w-[240px]">
							Play a quick match
						</SecondaryButton>
					</div>
				</div>
			</main>

			<div className="flex flex-col gap-2.5 lg:hidden">
				<Link href="/" className={buttonClasses('primary', 'lg')}>
					<ArrowLeft aria-hidden="true" className="size-5" />
					Go back home
				</Link>
				<SecondaryButton onClick={_playNow} isLoading={isStarting}>
					Play a quick match
				</SecondaryButton>
			</div>
		</div>
	);
}
