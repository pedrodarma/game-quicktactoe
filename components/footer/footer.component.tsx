import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { HowToPlay } from '../how-to-play';
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons';
import { MediumText } from '@design_system';

export function Footer() {
	return (
		<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-between w-full max-w-lg mx-auto">
			<HowToPlay />

			<a
				href="https://github.com/pedrodarma/game-quicktactoe"
				target="_blank"
				className="flex items-center gap-2 hover:underline hover:underline-offset-4"
				rel="noopener noreferrer">
				<FontAwesomeIcon icon={faGithub} className="fa-lg" />

				<MediumText>Github →</MediumText>
			</a>
		</footer>
	);
}
