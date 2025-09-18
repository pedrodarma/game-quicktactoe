import { Orbitron, Exo_2 } from 'next/font/google';

const titleFont = Orbitron({ subsets: ['latin'], weight: ['700'] });
const textFont = Exo_2({ subsets: ['latin'], weight: ['400'] });

export const constants = {
	// fontFamily: 'font-sans',
	fontFamily: titleFont.className,
};
