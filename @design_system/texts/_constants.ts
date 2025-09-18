import { Orbitron, Exo_2 } from 'next/font/google';

// const titleFont = Orbitron({ subsets: ['latin'], weight: ['700'] });
const textFont = Exo_2({
	subsets: ['latin'],
	weight: ['900', '800', '700', '600', '500', '400', '300', '200', '100'],
});

export const constants = {
	fontFamily: textFont.className,
};
