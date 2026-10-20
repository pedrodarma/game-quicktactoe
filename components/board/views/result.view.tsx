import Link from 'next/link';
import { RotateCcw } from 'lucide-react';
import { buttonClasses, cn, Eyebrow, Mark, PrimaryButton } from '@design_system';
import { BoardCells } from '@models';
import { Outcome, Piece } from '../game.utils';
import { BoardGrid } from './board-grid.view';

export interface ResultPlayer {
	symbol: Piece;
	title: string;
	subtitle?: string;
}

interface Props {
	outcome: Outcome;
	title: string;
	subtitle: string;
	board?: Record<string, string[]>;
	winningPositions?: BoardCells[];
	winnerSymbol?: Piece;
	/** Your player first. */
	players: [ResultPlayer, ResultPlayer];
	onPlayAgain: () => void;
	isRestarting?: boolean;
}

function _titleColor(outcome: Outcome) {
	if (outcome === 'win' || outcome === 'x-wins' || outcome === 'timeout')
		return 'text-x';
	if (outcome === 'o-wins') return 'text-o';
	return 'text-ink';
}

export function ResultView({
	outcome,
	title,
	subtitle,
	board,
	winningPositions,
	winnerSymbol,
	players,
	onPlayAgain,
	isRestarting = false,
}: Props) {
	return (
		<div className="flex flex-1 flex-col @3xl:grid @3xl:grid-cols-[minmax(0,1fr)_auto] @3xl:content-center @3xl:items-center @3xl:gap-x-12 @3xl:gap-y-7 @[56rem]:gap-x-16">
			<section
				aria-live="polite"
				className="flex flex-col gap-2.5 pt-3 @3xl:col-start-1 @3xl:row-start-1 @3xl:gap-3.5 @3xl:self-end @3xl:pt-0">
				<Eyebrow>Game over</Eyebrow>
				<h1
					className={cn(
						'font-display text-[2.5rem] leading-[1.04] text-balance font-extrabold tracking-[-0.03em] @3xl:text-[clamp(2.5rem,5vw,4rem)] @3xl:leading-[1.02]',
						_titleColor(outcome),
					)}>
					{title}
				</h1>
				<p className="text-base leading-[1.45] text-ink-2 @3xl:text-lg @3xl:leading-[1.5]">
					{subtitle}
				</p>
			</section>

			<div className="mt-6 grid grid-cols-2 gap-2.5 @3xl:col-start-1 @3xl:row-start-2 @3xl:mt-0 @3xl:grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] @3xl:gap-3">
				{players.map((player) => {
					const won = winnerSymbol === player.symbol;
					return (
						<div
							key={player.symbol}
							className={cn(
								'flex min-w-0 items-center gap-2.5 rounded-[18px] border-[1.5px] bg-surface py-3 pr-3 pl-3.5 @3xl:gap-3 @3xl:rounded-[20px] @3xl:py-3.5 @3xl:pl-4',
								won
									? player.symbol === 'X'
										? 'border-x'
										: 'border-o'
									: 'border-line',
							)}>
							<Mark
								symbol={player.symbol}
								strokeWidth={14}
								className="size-6 shrink-0 @3xl:size-[26px]"
							/>
							<div className="flex min-w-0 flex-col gap-px">
								<span className="text-sm font-bold text-ink @3xl:text-[15px]">
									{player.title}
								</span>
								{player.subtitle && (
									<span className="truncate text-xs font-medium text-muted @3xl:text-[13px]">
										{player.subtitle}
									</span>
								)}
							</div>
							{won && (
								<span
									className={cn(
										'ml-auto rounded-full px-[7px] py-1 font-mono text-[11px] font-bold tracking-[0.04em]',
										player.symbol === 'X'
											? 'bg-x text-on-primary light:text-ink'
											: 'bg-o text-on-primary light:text-white',
									)}>
									WIN
								</span>
							)}
						</div>
					);
				})}
			</div>

			<div className="mt-4 self-center rounded-[26px] border border-line bg-surface/90 p-3.5 shadow-[0_24px_60px_var(--qt-shadow)] @3xl:col-start-2 @3xl:row-span-3 @3xl:row-start-1 @3xl:mt-0 @3xl:rounded-[32px] @3xl:p-[18px]">
				<BoardGrid
					board={board}
					variant="result"
					winningPositions={winningPositions}
					winnerSymbol={winnerSymbol}
				/>
			</div>

			<div className="mt-auto flex flex-col gap-2.5 pt-6 @3xl:col-start-1 @3xl:row-start-3 @3xl:mt-0 @3xl:flex-row @3xl:flex-wrap @3xl:gap-3 @3xl:self-start @3xl:pt-0">
				<PrimaryButton
					size="lg"
					onClick={onPlayAgain}
					isLoading={isRestarting}
					icon={<RotateCcw aria-hidden="true" className="size-5" />}
					className="@3xl:flex-[1_1_200px]">
					Play again
				</PrimaryButton>
				<Link
					href="/"
					className={buttonClasses(
						'secondary',
						'md',
						'@3xl:h-15 @3xl:flex-[1_1_160px] @3xl:rounded-[20px]',
					)}>
					Back to menu
				</Link>
			</div>
		</div>
	);
}
