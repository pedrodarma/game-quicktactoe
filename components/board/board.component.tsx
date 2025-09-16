import { useGameContext } from '@providers';
import styles from './board.component.module.css';
import { Cell } from './views/cell.view';
import { BoardHeader } from './views/header.view';

export function Board() {
	const { gameState, playMove } = useGameContext();
	return (
		<div className="container flex flex-col justify-center items-center gap-8 h-full">
			<BoardHeader />
			<div className={styles.board}>
				<div className={styles.row}>
					<Cell value={gameState.board.a[0]} onClick={() => playMove('a0')} />
					<Cell value={gameState.board.a[1]} onClick={() => playMove('a1')} />
					<Cell value={gameState.board.a[2]} onClick={() => playMove('a2')} />
				</div>
				<div className={styles.row}>
					<Cell value={gameState.board.b[0]} onClick={() => playMove('b0')} />
					<Cell value={gameState.board.b[1]} onClick={() => playMove('b1')} />
					<Cell value={gameState.board.b[2]} onClick={() => playMove('b2')} />
				</div>
				<div className={styles.row}>
					<Cell value={gameState.board.c[0]} onClick={() => playMove('c0')} />
					<Cell value={gameState.board.c[1]} onClick={() => playMove('c1')} />
					<Cell value={gameState.board.c[2]} onClick={() => playMove('c2')} />
				</div>
			</div>
		</div>
	);
}
