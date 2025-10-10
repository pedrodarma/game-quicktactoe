import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faO } from '@fortawesome/free-solid-svg-icons';
import { useAppContext, useGameContext } from '@providers';

interface Props {
	value?: string;
	onClick: () => void;
	disabled?: boolean;
}

export function Cell({ value = undefined, onClick, disabled }: Props) {
	const { userState } = useAppContext();
	const { gameState } = useGameContext();

	const hasWinner = gameState.winner !== undefined;

	const _textColor = disabled ? 'text-white opacity-100 ' : 'text-white ';

	return (
		<div
			className={`size-30 sm:size-40 flex justify-center items-center rounded-lg select-none transition-all duration-300
								 ${
										gameState.status !== 'playing'
											? 'cursor-not-allowed bg-gray-400 hover:bg-gray-500 opacity-40'
											: gameState.turn === userState?.id ||
											  gameState.turn === `p2_${userState?.id}`
											? 'cursor-pointer bg-gray-600 hover:bg-gray-700'
											: 'cursor-progress bg-gray-500 hover:bg-gray-500 opacity-70'
									}`}
			onClick={() => {
				if (hasWinner) return;
				if (gameState.status === 'waiting') return;
				if (gameState.status === 'finished') return;
				if (
					gameState.turn === userState?.id ||
					gameState.turn === `p2_${userState?.id}`
				) {
					onClick();
				}
			}}>
			{value?.replace('-', '').toLowerCase() === 'x' && (
				<FontAwesomeIcon
					icon={faXmark}
					className={`fa-lg transition-all duration-300 ${_textColor} scale-600`}
				/>
			)}
			{value?.replace('-', '').toLowerCase() === 'o' && (
				<FontAwesomeIcon
					icon={faO}
					className={`fa-lg transition-all duration-300 ${_textColor} scale-600`}
				/>
			)}
		</div>
	);
}
