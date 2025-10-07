import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faO } from '@fortawesome/free-solid-svg-icons';
import styles from './cell.view.module.css';
import { useGameContext } from '@providers';

interface Props {
	value?: string;
	onClick: () => void;
	disabled?: boolean;
}

export function Cell({ value = undefined, onClick, disabled }: Props) {
	const { gameState } = useGameContext();

	const hasWinner = gameState.winner !== undefined;

	const _textColor = disabled
		? 'text-gray-400 scale-80 opacity-60 transition-all duration-300'
		: 'text-white scale-110 transition-all duration-300';

	return (
		<div className={styles.cell} onClick={onClick}>
			{value?.replace('-', '').toLowerCase() === 'x' && (
				<FontAwesomeIcon icon={faXmark} className={`fa-lg ${_textColor}`} />
			)}
			{value?.replace('-', '').toLowerCase() === 'o' && (
				<FontAwesomeIcon icon={faO} className={`fa-lg ${_textColor}`} />
			)}
		</div>
	);
}
