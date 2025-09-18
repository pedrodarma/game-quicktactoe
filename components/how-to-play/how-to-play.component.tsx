import { LargeText, MediumText, MediumTitle } from '@design_system';
import styles from './how-to-play.component.module.css';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function HowToPlay() {
	return (
		<div className={styles.modal_wrapper}>
			<input
				type="checkbox"
				id="modal-toggle"
				className={styles.modal_toggle}
			/>

			<label htmlFor="modal-toggle" className={styles.open_modal_btn}>
				<FontAwesomeIcon icon={faDice} className="fa-lg" />
				<MediumText>How to play?</MediumText>
			</label>

			<div
				className={styles.modal}
				onClick={(e) => {
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
					<MediumTitle>How to play?</MediumTitle>

					<MediumText>
						<p className="italic">
							The <b>QuickTacToe</b> is a quick version of the classic Tic Tac
							Toe game.
						</p>
					</MediumText>

					<ul className="list-disc list-inside">
						<MediumText>
							<b>1 - </b>Play against a friend in real-time.
						</MediumText>

						<MediumText>
							<b>2 - </b>Each player has a limited time to make their move.
						</MediumText>

						<MediumText>
							<b>3 - </b>First to get 3 in a row wins!
						</MediumText>

						<MediumText>
							<b>4 - </b>Can you beat your opponent before time runs out?
						</MediumText>
					</ul>

					<label
						htmlFor="modal-toggle"
						className="bg-black hover:bg-gray-600 text-white text-center font-bold py-2 px-4 rounded cursor-pointer mt-4 transition-colors">
						<LargeText>Done</LargeText>
					</label>
				</div>
			</div>
		</div>
	);
}
