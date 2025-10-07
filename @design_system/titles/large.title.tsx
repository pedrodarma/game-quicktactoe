import { constants } from './_constants';

export function LargeTitle({ children }: { children: React.ReactNode }) {
	return (
		<h1
			className={`${constants.fontFamily} text-4xl sm:text-5xl md:text-6xl font-bold leading-tight select-none`}>
			{children}
		</h1>
	);
}
