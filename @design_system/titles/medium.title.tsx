// interface Props {
//   text: string;
// }

import { constants } from './_constants';

// export function MediumTitle({ text }: Props) {
//   return <h2 className="text-2xl font-semibold text-gray-800">{text}</h2>;
// }

export function MediumTitle({ children }: { children: React.ReactNode }) {
	return (
		<h2
			className={`${constants.fontFamily} text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight select-none`}>
			{children}
		</h2>
	);
}
