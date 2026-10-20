import Link from 'next/link';
import { Timer } from 'lucide-react';
import { buttonClasses, Eyebrow, LogoMark } from '@design_system';
import { GameMode, MODE_LABEL, MOVE_DURATION } from '../game.utils';

// Cells light up in a spiral; the centre holds the logo.
const _delays = [0, 0.15, 0.3, 1.05, null, 0.45, 0.9, 0.75, 0.6];

export function WaitingView({ mode }: { mode: GameMode }) {
	const online = mode === 'online';

	return (
		<div className="flex flex-1 flex-col gap-6 @3xl:items-center @3xl:justify-center @3xl:gap-10">
			<div className="flex flex-1 flex-col items-center justify-center gap-9 @3xl:flex-none @3xl:gap-10">
				<div
					aria-hidden="true"
					className="grid w-[min(244px,100%)] grid-cols-3 gap-2 @3xl:w-[336px] @3xl:gap-2.5">
					{_delays.map((delay, index) =>
						delay === null ? (
							<div
								key={index}
								className="flex aspect-square items-center justify-center rounded-[18px] border-[1.5px] border-line bg-surface @3xl:rounded-3xl">
								<LogoMark className="size-[46%] [&_rect]:hidden" />
							</div>
						) : (
							<div
								key={index}
								className="qt-scan aspect-square rounded-[18px] border-[1.5px] border-line bg-surface @3xl:rounded-3xl"
								style={{ animationDelay: `${delay}s` }}
							/>
						),
					)}
				</div>

				<div className="flex flex-col items-center gap-2.5 text-center @3xl:gap-3">
					<Eyebrow>{MODE_LABEL[mode]}</Eyebrow>
					<h1 className="font-display text-[26px] leading-[1.1] text-balance font-extrabold tracking-[-0.02em] text-ink @3xl:text-[2.5rem]">
						{online ? 'Finding an opponent' : 'Setting up the board'}
					</h1>
					<p className="max-w-[280px] text-[15px] leading-[1.45] text-ink-2 @3xl:max-w-none @3xl:text-[17px]">
						{online
							? 'The match starts as soon as someone joins.'
							: 'Starting in a moment.'}
					</p>
				</div>
			</div>

			<div className="flex w-full flex-col items-center gap-3 @3xl:max-w-[560px] @3xl:gap-3.5">
				<div className="flex w-full items-center gap-3 rounded-[18px] border border-line bg-surface px-4 py-3.5 @3xl:gap-3.5 @3xl:rounded-[20px] @3xl:px-[18px] @3xl:py-4">
					<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-x-tint @3xl:size-11 @3xl:rounded-[14px]">
						<Timer aria-hidden="true" className="size-5 text-x" />
					</span>
					<p className="text-sm leading-[1.4] text-ink-2 @3xl:text-[15px]">
						<strong className="text-ink">Get ready.</strong> You’ll have{' '}
						{MOVE_DURATION} seconds for every move.
					</p>
				</div>
				<Link
					href="/"
					className={buttonClasses(
						'secondary',
						'md',
						'w-full @3xl:w-[min(320px,100%)]',
					)}>
					Cancel
				</Link>
			</div>
		</div>
	);
}
