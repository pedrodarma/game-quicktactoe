'use client';

import { useAppContext, useGameContext } from '@providers';
import { Cell } from './views/cell.view';
import { BoardHeader } from './views/header.view';
import { LargeText, PrimaryButton } from '@design_system';
import { BoardCells } from '@models';

export function Board() {
	const { createGame } = useAppContext();
	const { gameState, move } = useGameContext();

	const hasWinner = gameState.winner !== undefined;

	function isDisabled(cell: BoardCells): boolean {
		return hasWinner && !(gameState.winningPositions?.includes(cell) ?? false);
	}

	return (
		<>
			<div
				className={`flex flex-col justify-center items-center gap-1 transition-all ${
					hasWinner ? 'block scale-190' : 'hidden scale-50'
				}`}>
				<LargeText>Game Over</LargeText>
				<LargeText>
					{gameState.winner === 'draw'
						? "It's a Draw!"
						: gameState.winner === gameState.playerX?.id
						? 'Player X Wins!'
						: gameState.winner === gameState.playerO?.id
						? 'Player O Wins!'
						: ''}
				</LargeText>
			</div>
			<div
				className={`container flex flex-col justify-center items-center gap-8 h-100 transition-all ${
					hasWinner ? 'scale-40' : 'opacity-100'
				} `}>
				{/* <div className="scale-70">{JSON.stringify(gameState)}</div> */}
				<BoardHeader />

				{/* <div className={hasWinner ? styles.disabledBoard : styles.board}> */}
				<div className={`flex flex-col gap-1 bg-gray-800 p-1 rounded-lg `}>
					{/* <div className={styles.row}> */}
					<div className={`flex flex-row gap-1`}>
						<Cell
							value={gameState.board?.a[0]}
							onClick={() => move('a0')}
							disabled={isDisabled('a0')}
						/>
						<Cell
							value={gameState.board?.a[1]}
							onClick={() => move('a1')}
							disabled={isDisabled('a1')}
						/>
						<Cell
							value={gameState.board?.a[2]}
							onClick={() => move('a2')}
							disabled={isDisabled('a2')}
						/>
					</div>
					<div className={`flex flex-row gap-1`}>
						<Cell
							value={gameState.board?.b[0]}
							onClick={() => move('b0')}
							disabled={isDisabled('b0')}
						/>
						<Cell
							value={gameState.board?.b[1]}
							onClick={() => move('b1')}
							disabled={isDisabled('b1')}
						/>
						<Cell
							value={gameState.board?.b[2]}
							onClick={() => move('b2')}
							disabled={isDisabled('b2')}
						/>
					</div>
					<div className={`flex flex-row gap-1`}>
						<Cell
							value={gameState.board?.c[0]}
							onClick={() => move('c0')}
							disabled={isDisabled('c0')}
						/>
						<Cell
							value={gameState.board?.c[1]}
							onClick={() => move('c1')}
							disabled={isDisabled('c1')}
						/>
						<Cell
							value={gameState.board?.c[2]}
							onClick={() => move('c2')}
							disabled={isDisabled('c2')}
						/>
					</div>
				</div>
			</div>
			<div
				className={`flex flex-col justify-center items-center gap-1 transition-all ${
					hasWinner ? 'block scale-150' : 'hidden scale-50'
				}`}>
				<PrimaryButton
					onClick={() => {
						// cleanState();
						const gameMode = gameState.hash?.includes('bot_')
							? 'local_bot'
							: gameState.hash?.includes('pvp_')
							? 'local_pvp'
							: 'online';
						createGame(gameMode);
					}}>
					Play Again
				</PrimaryButton>
			</div>
		</>
	);
}
