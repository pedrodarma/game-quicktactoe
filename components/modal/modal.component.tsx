import Image from 'next/image';
import styles from './modal.component.module.css';

export function Modal() {
	return (
		<div className={styles.modal_wrapper}>
			{/* Checkbox controla a abertura */}
			<input
				type="checkbox"
				id="modal-toggle"
				className={styles.modal_toggle}
			/>

			{/* Botão para abrir */}
			<label htmlFor="modal-toggle" className={styles.open_modal_btn}>
				<Image
					aria-hidden
					src="/assets/file.svg"
					alt="File icon"
					width={16}
					height={16}
				/>
				How to play?
			</label>

			{/* Modal */}
			<div
				className={styles.modal}
				onClick={(e) => {
					// fecha o modal se clicar fora do conteúdo
					if (e.target === e.currentTarget) {
						const checkbox = document.getElementById(
							'modal-toggle',
						) as HTMLInputElement;
						if (checkbox) {
							checkbox.checked = false;
						}
					}
				}}>
				<div className={styles.modal_content}>
					<h2 className="text-2xl font-bold border-b border-gray-300">
						How to play?
						{/* How to play <span>QuickTacToe</span>? */}
					</h2>
					{/* italic text */}
					<p className="italic">
						The <b>QuickTacToe</b> is a quick version of the classic Tic Tac Toe
						game.
					</p>
					<p>
						1 - The game is played on a 3x3 grid. You are X, your opponent is O.
					</p>
					<p>
						2 - The game starts automatically as soon as both players are
						connected.
					</p>
					<p>
						3 - Players take turns putting their marks in empty squares. The
						first player to get 3 of her marks in a row (up, down, across, or
						diagonally) is the winner.
					</p>
					<p>4 - When all 9 squares are full, the game is over.</p>
					<p>5 - If no player has 3 marks in a row, the game ends in a tie.</p>
					<p>
						6 - If the timer runs out before a player makes a move, they forfeit
						the game.
					</p>
					{/* <p>
            Aqui você pode explicar as regras do jogo. Tudo controlado com CSS!
          </p> */}
					{/* Botão de fechar */}
					<label
						htmlFor="modal-toggle"
						className="bg-black hover:bg-gray-600 text-white text-center font-bold py-2 px-4 rounded cursor-pointer mt-4 transition-colors">
						Done
					</label>
				</div>
			</div>
		</div>
	);
}
