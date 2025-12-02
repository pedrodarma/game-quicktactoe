import { constants } from './_constants';

export function SmallTitle({ children }: { children: React.ReactNode }) {
	return (
		<h3
			className={`${constants.fontFamily} text-xl sm:text-xl md:text-2xl font-semibold leading-tight select-none`}>
			{children}
		</h3>
	);
}
