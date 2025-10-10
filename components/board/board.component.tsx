'use client';

import { useGameContext } from '@providers';
import { Cell } from './views/cell.view';
import { BoardHeader } from './views/header.view';
import { BoardCells } from '@models';
import { LoadingGame } from '@components';
import ProgressBar from '../progress_bar/progress-bar.component';
import { GameOver } from './views/game-over.view';
import { PlayAgain } from './views/play-again.view';

export function Board() {
	const { gameState, move, timeout } = useGameContext();

	const hasWinner = gameState.winner !== undefined;
	const isGameRunning = gameState.status === 'playing';

	function isDisabled(cell: BoardCells): boolean {
		return hasWinner && !(gameState.winningPositions?.includes(cell) ?? false);
	}

	const _styleLoading =
		gameState.status === 'waiting' ? 'block scale-130 sm:scale-190' : 'hidden';
	const _styleBoard =
		gameState.status !== 'playing' || hasWinner ? 'scale-30' : 'opacity-100';

	return (
		<>
			<GameOver />
			<div
				className={`flex flex-col justify-center items-center gap-1 transition-all ${_styleLoading}`}>
				<LoadingGame />
			</div>
			<div
				className={`container flex flex-col justify-center items-center gap-8 h-100 transition-all ${_styleBoard} `}>
				{/* <div className="scale-170">{JSON.stringify(gameState)}</div> */}
				<BoardHeader />

				<div className={`flex flex-col gap-1 bg-gray-800 p-1 rounded-lg `}>
					{Object.keys(gameState.board ?? {}).map((key) => {
						return (
							<div key={key} className={`flex flex-row gap-1`}>
								{(gameState.board as Record<string, string[]>)[key].map(
									(value: string, index: number) => {
										const cellKey = `${key}${index}` as BoardCells;
										return (
											<Cell
												key={cellKey}
												value={value}
												onClick={() => move(cellKey)}
												disabled={isDisabled(cellKey)}
											/>
										);
									},
								)}
							</div>
						);
					})}
				</div>
				{isGameRunning && <ProgressBar duration={10} onFinish={timeout} />}
			</div>
			<PlayAgain />
		</>
	);
}
