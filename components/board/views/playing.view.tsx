import { BoardCells } from '@models';
import { Piece } from '../game.utils';
import { BoardGrid } from './board-grid.view';
import { ClockPanel, PanelPlayer } from './clock-panel.view';
import { TurnChip } from './turn-chip.view';

interface Props {
	me: PanelPlayer;
	opponent: PanelPlayer;
	turn?: { symbol?: Piece; label: string };
	board?: Record<string, string[]>;
	canPlay: boolean;
	ghostSymbol?: Piece;
	dimmed: boolean;
	timeLeft: number;
	duration: number;
	onMove: (cell: BoardCells) => void;
}

/**
 * Phones: opponent clock on top, board in the middle, your clock at the
 * bottom. Wide containers: your clock | board | opponent clock.
 */
export function PlayingView({
	me,
	opponent,
	turn,
	board,
	canPlay,
	ghostSymbol,
	dimmed,
	timeLeft,
	duration,
	onMove,
}: Props) {
	const clock = { timeLeft, duration };

	return (
		<div className="flex flex-1 flex-col justify-between gap-5 @3xl:justify-center @3xl:gap-7">
			<ClockPanel {...opponent} {...clock} className="@3xl:hidden" />

			<div className="flex flex-col items-center gap-4 @3xl:gap-7">
				<TurnChip
					symbol={turn?.symbol}
					label={turn?.label ?? 'Get ready'}
				/>
				<div className="flex w-full items-center justify-center @3xl:w-auto @3xl:gap-6 @[56rem]:gap-7">
					<ClockPanel {...me} {...clock} className="hidden @3xl:flex" />
					<BoardGrid
						board={board}
						canPlay={canPlay}
						ghostSymbol={ghostSymbol}
						dimmed={dimmed}
						onMove={onMove}
					/>
					<ClockPanel {...opponent} {...clock} className="hidden @3xl:flex" />
				</div>
			</div>

			<ClockPanel
				{...me}
				{...clock}
				emphasis="primary"
				className="@3xl:hidden"
			/>
		</div>
	);
}
