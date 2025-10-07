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

	const _textColor = disabled ? 'text-gray-400 opacity-60 ' : 'text-white ';

	return (
		<div
			className={`size-40 flex hover:bg-gray-600 justify-center items-center rounded-lg select-none transition-all duration-300
								 ${
										gameState.status === 'waiting' ||
										gameState.status === 'finished'
											? 'cursor-not-allowed bg-black opacity-30'
											: gameState.turn === userState?.id
											? 'cursor-pointer bg-gray-900'
											: 'cursor-progress bg-gray-900 opacity-70'
									}`}
			onClick={() => {
				if (disabled || hasWinner) return;
				if (gameState.status === 'waiting') return;
				if (gameState.status === 'finished') return;
				if (gameState.turn !== userState?.id) return;
				onClick();
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
