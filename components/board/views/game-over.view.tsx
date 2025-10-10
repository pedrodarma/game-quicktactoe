import { LargeText } from '@design_system';
import { useGameContext } from '@providers';

export function GameOver() {
	const { gameState } = useGameContext();

	const hasWinner = gameState.winner !== undefined;

	return (
		<div
			className={`flex flex-col justify-center items-center gap-1 transition-all ${
				gameState.status === 'finished' || hasWinner
					? 'block scale-240'
					: 'hidden scale-50'
			}`}>
			<LargeText>Game Over</LargeText>
			{gameState.timeout && (
				<LargeText>{gameState.timeout ? 'Time Out!' : ''}</LargeText>
			)}
			<LargeText>
				{!gameState.timeout &&
				(gameState.winner === 'draw' ||
					gameState.winner === '' ||
					gameState.winner === undefined ||
					gameState.winner === null)
					? "It's a Draw!"
					: gameState.winner === gameState.playerX?.id
					? 'Player X Wins!'
					: gameState.winner === gameState.playerO?.id
					? 'Player O Wins!'
					: ''}
			</LargeText>
		</div>
	);
}
