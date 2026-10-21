'use client';

import { useRef } from 'react';
import { CircleHelp, X } from 'lucide-react';
import {
	cn,
	IconButton,
	MediumText,
	MediumTitle,
	PrimaryButton,
} from '@design_system';
import { MATCH_DURATION } from '../board/game.utils';

const _rules = [
	{
		title: 'Pick your opponent',
		text: 'Play someone online in real time, the bot, or a friend on the same device.',
	},
	{
		title: `${MATCH_DURATION} seconds per match`,
		text: 'The clock runs for the whole game. Watch the bar drain.',
	},
	{
		title: 'Three in a row wins',
		text: 'Across, down or diagonal — first to line up three takes the round.',
	},
	{
		title: 'Beat the clock',
		text: 'Can you win before time runs out?',
	},
];

/**
 * "How to play" link plus its dialog: a bottom sheet on phones and a
 * centred modal on larger screens.
 */
export function HowToPlay({ className }: { className?: string }) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const open = () => dialogRef.current?.showModal();
	const close = () => dialogRef.current?.close();

	return (
		<>
			<button
				type="button"
				onClick={open}
				aria-haspopup="dialog"
				className={cn(
					'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[14px] text-sm font-semibold text-ink-2 transition-colors hover:text-ink',
					className,
				)}>
				<CircleHelp aria-hidden="true" className="size-[18px]" />
				How to play
			</button>

			<dialog
				ref={dialogRef}
				aria-labelledby="how-to-play-title"
				onClick={(event) => {
					if (event.target === dialogRef.current) close();
				}}
				className="m-0 mt-auto max-h-[92dvh] w-full max-w-full overflow-y-auto rounded-t-[30px] border-t border-line bg-surface p-0 text-ink shadow-[0_-24px_60px_var(--qt-shadow)] backdrop:bg-overlay sm:m-auto sm:max-w-[680px] sm:rounded-[32px] sm:border sm:shadow-[0_40px_100px_var(--qt-shadow)]">
				<div className="flex flex-col gap-[18px] px-5 pt-3 pb-6 sm:gap-6 sm:p-8">
					<div
						aria-hidden="true"
						className="mx-auto h-1 w-10 rounded-full bg-line sm:hidden"
					/>

					<div className="flex items-start justify-between gap-4">
						<div className="flex flex-col gap-3">
							<MediumTitle id="how-to-play-title">How to play</MediumTitle>
							<MediumText className="hidden max-w-[500px] sm:block sm:text-base">
								QuickTacToe is a quick version of the classic game. Same board,
								same rules — much less time to think.
							</MediumText>
						</div>
						<IconButton
							aria-label="Close"
							tone="ground"
							onClick={close}
							icon={<X aria-hidden="true" className="size-5" />}
						/>
					</div>

					<MediumText className="sm:hidden">
						QuickTacToe is a quick version of the classic game. Same board, same
						rules — much less time to think.
					</MediumText>

					<ol className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
						{_rules.map((rule, index) => {
							const isX = index % 2 === 0;
							return (
								<li
									key={rule.title}
									className="flex items-center gap-3.5 rounded-[18px] border border-line bg-ground p-3 sm:flex-col sm:items-start sm:rounded-[22px] sm:p-[18px]">
									<span
										aria-hidden="true"
										className={cn(
											'flex size-11 shrink-0 items-center justify-center rounded-[14px] font-mono text-sm font-bold',
											isX ? 'bg-x-tint text-x-text' : 'bg-o-tint text-o-text',
										)}>
										{String(index + 1).padStart(2, '0')}
									</span>
									<span className="flex flex-col gap-0.5 sm:gap-1">
										<span className="text-[15px] font-bold sm:text-base">
											{rule.title}
										</span>
										<span className="text-[13px] leading-[1.4] text-muted sm:text-sm sm:leading-[1.45]">
											{rule.text}
										</span>
									</span>
								</li>
							);
						})}
					</ol>

					<div className="flex justify-end">
						<PrimaryButton onClick={close} className="w-full sm:w-[220px]">
							Got it
						</PrimaryButton>
					</div>
				</div>
			</dialog>
		</>
	);
}
