import { constants } from './_constants';

export function MediumText({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`${constants.fontFamily} pb-1 text-base sm:text-base md:text-base leading-tight`}>
			{children}
		</div>
	);
}
