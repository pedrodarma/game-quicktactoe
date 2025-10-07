import { SmallTitle } from '@design_system';
import { faO } from '@fortawesome/free-solid-svg-icons/faO';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGameContext } from '@providers';

export function BoardHeader() {
	const { gameState } = useGameContext();

	const hasWinner = gameState.winner !== undefined;
	// const isPlayerXWinner =
	// 	hasWinner && gameState.winner === gameState.playerX?.id;
	// const isPlayerOWinner =
	// 	hasWinner && gameState.winner === gameState.playerO?.id;

	// const _commonStyle = `fa-lg transition-all duration-300 ${

	const playerXBorder =
		gameState.turn === gameState.playerX?.id
			? 'border-b border-b-green-500'
			: '';
	const playerOBorder =
		gameState.turn === gameState.playerO?.id
			? 'border-b border-b-green-500'
			: '';

	return (
		<>
			<div className="flex flex-row justify-between items-center gap-4 w-full max-w-lg mx-auto">
				<div
					className={`flex flex-col items-center pb-2 ${playerXBorder} transition-all duration-300 ${
						hasWinner && gameState.winner === gameState.playerX?.id
							? 'border-b-4 border-b-yellow-400 scale-140 ml-3'
							: ''
					} `}>
					<SmallTitle>
						Player{' '}
						<FontAwesomeIcon icon={faXmark} className="fa-lg text-white" />
					</SmallTitle>

					<small>{!gameState.isLocal ? '(you)' : ''}</small>
				</div>

				<span>vs</span>

				<div
					className={`flex flex-col items-center pb-2 ${playerOBorder} transition-all duration-300 ${
						hasWinner && gameState.winner === gameState.playerO?.id
							? 'border-b-4 border-b-yellow-400 scale-140 mr-3'
							: ''
					} `}>
					<SmallTitle>
						Player <FontAwesomeIcon icon={faO} className="fa-lg text-white" />
					</SmallTitle>

					<small>{!gameState.isLocal ? '(opponent)' : ''}</small>
				</div>
			</div>
		</>
	);
}
