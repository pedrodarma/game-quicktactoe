import { cn, Mark } from '@design_system';
import { BoardCells } from '@models';
import { BOARD_ROWS, cellSymbol, Piece } from '../game.utils';

interface Props {
	board?: Record<string, string[]>;
	variant?: 'play' | 'result';
	/** Whether the current player may place a piece. */
	canPlay?: boolean;
	/** Piece previewed on hover / focus of empty cells. */
	ghostSymbol?: Piece;
	/** Dims the board while the other player is moving. */
	dimmed?: boolean;
	winningPositions?: BoardCells[];
	winnerSymbol?: Piece;
	onMove?: (cell: BoardCells) => void;
	className?: string;
}

export function BoardGrid({
	board,
	variant = 'play',
	canPlay = false,
	ghostSymbol,
	dimmed = false,
	winningPositions,
	winnerSymbol,
	onMove,
	className,
}: Props) {
	const isResult = variant === 'result';
	const hasLine = (winningPositions?.length ?? 0) > 0;

	return (
		<div
			role="group"
			aria-label={isResult ? 'Final board' : 'Board'}
			className={cn(
				'grid grid-cols-3 transition-opacity duration-300',
				isResult
					? 'w-64 gap-2 @3xl:w-[340px] @3xl:gap-2.5 @[56rem]:w-[400px]'
					: 'w-[min(100%,340px,calc(100dvh_-_25rem))] min-w-[240px] gap-2 @3xl:w-[340px] @[56rem]:w-[400px] @[56rem]:gap-2.5',
				dimmed && 'opacity-55',
				className,
			)}>
			{BOARD_ROWS.map((row, rowIndex) =>
				[0, 1, 2].map((col) => {
					const cell = `${row}${col}` as BoardCells;
					const symbol = cellSymbol(board?.[row]?.[col]);
					const label = `Row ${rowIndex + 1}, column ${col + 1}: ${symbol ?? 'empty'}`;
					const inLine = winningPositions?.includes(cell) ?? false;

					if (isResult) {
						return (
							<div
								key={cell}
								className={cn(
									'flex aspect-square items-center justify-center rounded-[18px] border-[1.5px] @3xl:rounded-3xl',
									inLine
										? winnerSymbol === 'O'
											? 'border-o bg-o-tint'
											: 'border-x bg-x-tint'
										: 'border-line bg-surface-2',
									hasLine && !inLine && 'opacity-40',
								)}>
								<span className="sr-only">
									{label}
									{inLine ? ' (winning line)' : ''}
								</span>
								<Mark symbol={symbol} className="size-[52%]" />
							</div>
						);
					}

					const playable = canPlay && !symbol;

					return (
						<button
							key={cell}
							type="button"
							aria-label={label}
							aria-disabled={!playable}
							onClick={() => playable && onMove?.(cell)}
							className={cn(
								'group relative flex aspect-square items-center justify-center rounded-[20px] border border-line bg-surface transition-colors duration-200 @[56rem]:rounded-3xl',
								playable
									? cn(
											'cursor-pointer',
											ghostSymbol === 'O'
												? 'hover:border-o/55 hover:bg-o-tint focus-visible:bg-o-tint'
												: 'hover:border-x/55 hover:bg-x-tint focus-visible:bg-x-tint',
										)
									: symbol
										? 'cursor-default'
										: 'cursor-not-allowed',
							)}>
							{symbol ? (
								<Mark symbol={symbol} className="size-[52%]" />
							) : (
								playable &&
								ghostSymbol && (
									<Mark
										symbol={ghostSymbol}
										className="size-[52%] opacity-0 transition-opacity duration-150 group-hover:opacity-35 group-focus-visible:opacity-35"
									/>
								)
							)}
						</button>
					);
				}),
			)}
		</div>
	);
}
