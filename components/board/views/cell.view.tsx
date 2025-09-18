import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faO } from '@fortawesome/free-solid-svg-icons';
import styles from './cell.view.module.css';

interface Props {
	value?: string;
	// value?: 'X' | 'O' | null;
	onClick?: () => void;
}

export function Cell({ value = undefined, onClick = () => {} }: Props) {
	return (
		<div className={styles.cell} onClick={onClick}>
			{value?.replace('-', '').toLowerCase() === 'x' && (
				<FontAwesomeIcon icon={faXmark} className="fa-lg text-white" />
			)}
			{value?.replace('-', '').toLowerCase() === 'o' && (
				<FontAwesomeIcon icon={faO} className="fa-lg text-white" />
			)}
			{/*  */}
			{/* Cell */}
		</div>
	);
}
