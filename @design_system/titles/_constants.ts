import { Orbitron } from 'next/font/google';

const titleFont = Orbitron({
	subsets: ['latin'],
	weight: ['900', '800', '700', '600', '500', '400'],
});

export const constants = {
	fontFamily: titleFont.className,
};
