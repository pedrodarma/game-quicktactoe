import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HowToPlay } from '../how_to_play';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { MediumText } from '@design_system';

export function Footer() {
	return (
		<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-between w-full max-w-lg mx-auto z-1">
			<HowToPlay />

			<a
				href="https://github.com/pedrodarma/game-quicktactoe"
				target="_blank"
				className="flex items-center gap-2"
				rel="noopener noreferrer">
				<FontAwesomeIcon icon={faGithub} className="fa-lg" />

				<MediumText>Github →</MediumText>
			</a>
		</footer>
	);
}
