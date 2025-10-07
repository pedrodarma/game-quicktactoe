import { constants } from './_constants';

export function SmallText({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`${constants.fontFamily} pb-1 text-sm sm:text-sm md:text-sm leading-tight select-none`}>
			{children}
		</div>
	);
}
