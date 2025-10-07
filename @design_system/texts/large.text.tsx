import { constants } from './_constants';

export function LargeText({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`${constants.fontFamily} pb-1 text-lg sm:text-lg md:text-lg leading-tight select-none`}>
			{children}
		</div>
	);
}
