import styles from './cell.view.module.css';

interface Props {
	value?: string;
	// value?: 'X' | 'O' | null;
	onClick?: () => void;
}

export function Cell({ value = undefined, onClick = () => {} }: Props) {
	return (
		<div className={styles.cell} onClick={onClick}>
			<b>{value?.replace('-', '')}</b>
			{/*  */}
			{/* Cell */}
		</div>
	);
}
