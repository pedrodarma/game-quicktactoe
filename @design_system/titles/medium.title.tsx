import { constants } from './_constants';

export function MediumTitle({ children }: { children: React.ReactNode }) {
	return (
		<h2
			className={`${constants.fontFamily} text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight select-none`}>
			{children}
		</h2>
	);
}
