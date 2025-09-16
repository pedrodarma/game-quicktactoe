import Image from 'next/image';
import { Modal } from '../modal';

export function Footer() {
	return (
		// <footer className="flex flex-row justify-center items-center gap-4 mt-8 mb-4">
		<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-between w-full max-w-lg mx-auto">
			<Modal />

			<a
				href="https://github.com/pedrodarma/game-quicktactoe"
				target="_blank"
				className="flex items-center gap-2 hover:underline hover:underline-offset-4"
				rel="noopener noreferrer">
				<Image
					aria-hidden
					src="/assets/globe.svg"
					alt="Globe icon"
					width={16}
					height={16}
				/>
				Github →
			</a>
		</footer>
	);
}
