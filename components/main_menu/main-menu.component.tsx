'use client';

import { ReactNode, useState } from 'react';
import { ArrowRight, Bot, Users } from 'lucide-react';
import { cn } from '@design_system';
import { GameModes } from '@models';
import { useAppContext } from '@providers';

function ModeCard({
	icon,
	tint,
	title,
	subtitle,
	busy,
	onClick,
}: {
	icon: ReactNode;
	tint: 'x' | 'o';
	title: string;
	subtitle: string;
	busy: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={busy}
			aria-busy={busy || undefined}
			className="flex min-h-24 cursor-pointer flex-col justify-between gap-3.5 rounded-[20px] border border-line bg-surface px-4 py-3.5 text-left text-ink transition-colors hover:bg-surface-2 disabled:cursor-progress disabled:opacity-70 lg:min-h-[76px] lg:flex-row lg:items-center lg:justify-start lg:rounded-[22px] lg:px-[18px]">
			<span
				className={cn(
					'flex lg:size-11 lg:shrink-0 lg:items-center lg:justify-center lg:rounded-[14px]',
					tint === 'x' ? 'text-x lg:bg-x-tint' : 'text-o lg:bg-o-tint',
				)}>
				{icon}
			</span>
			<span className="flex flex-col gap-0.5">
				<span className="text-[15px] font-bold lg:text-base">{title}</span>
				<span className="text-xs font-medium text-muted lg:text-[13px]">
					{subtitle}
				</span>
			</span>
		</button>
	);
}

/** The three ways to start a game. */
export function MainMenu({ className }: { className?: string }) {
	const { createGame } = useAppContext();
	const [pending, setPending] = useState<GameModes>();

	async function _start(mode: GameModes) {
		if (pending) return;
		setPending(mode);
		try {
			await createGame(mode);
		} finally {
			setPending(undefined);
		}
	}

	return (
		<nav
			aria-label="Game modes"
			className={cn('flex w-full flex-col gap-2.5 lg:max-w-[560px] lg:gap-3', className)}>
			<button
				type="button"
				onClick={() => _start('online')}
				disabled={!!pending}
				aria-busy={pending === 'online' || undefined}
				className="flex h-[66px] cursor-pointer items-center justify-between gap-3 rounded-[20px] bg-primary pr-3 pl-[22px] text-left text-on-primary transition-opacity hover:opacity-90 disabled:cursor-progress disabled:opacity-80 lg:h-20 lg:rounded-[22px] lg:pr-3.5 lg:pl-[26px]">
				<span className="flex flex-col gap-[3px] lg:gap-1">
					<span className="font-display text-lg font-bold tracking-[-0.01em] lg:text-[22px]">
						{pending === 'online' ? 'Starting…' : 'Play now'}
					</span>
					<span className="text-[13px] font-semibold text-on-primary-2 lg:text-sm">
						Online · real-time match
					</span>
				</span>
				<span className="flex size-11 items-center justify-center rounded-[14px] bg-ground text-ink lg:size-[52px] lg:rounded-2xl">
					<ArrowRight aria-hidden="true" className="size-5 lg:size-[22px]" />
				</span>
			</button>

			<div className="grid grid-cols-2 gap-2.5 lg:grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] lg:gap-3">
				<ModeCard
					tint="o"
					icon={<Bot aria-hidden="true" className="size-6 lg:size-[22px]" />}
					title="Player vs Bot"
					subtitle="Practice solo"
					busy={pending === 'local_bot'}
					onClick={() => _start('local_bot')}
				/>
				<ModeCard
					tint="x"
					icon={<Users aria-hidden="true" className="size-6 lg:size-[22px]" />}
					title="Player vs Player"
					subtitle="Same device"
					busy={pending === 'local_pvp'}
					onClick={() => _start('local_pvp')}
				/>
			</div>
		</nav>
	);
}
