// interface Props {
//   text: string;
// }

import { constants } from './_constants';

// export function MediumTitle({ text }: Props) {
//   return <h2 className="text-2xl font-semibold text-gray-800">{text}</h2>;
// }

export function SmallTitle({ children }: { children: React.ReactNode }) {
	return (
		<h3
			className={`${constants.fontFamily} text-xl sm:text-xl md:text-2xl font-semibold leading-tight select-none`}>
			{children}
		</h3>
	);
}
