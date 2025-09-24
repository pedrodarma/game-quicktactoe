import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Colors = 'blue' | 'red' | 'green' | 'yellow' | 'gray';

interface Props {
	id?: string;
	disabled?: boolean;
	showBadge?: boolean;
	icon: IconDefinition;
	color?: Colors;
	onClick: () => void;
}

export function CircularButton(props: Props) {
	const { id, icon, disabled, showBadge, color = 'blue', onClick } = props;
	const _color = disabled ? 'gray' : color;

	return (
		<div
			id={id}
			className={`relative bg-${_color}-500 hover:bg-${_color}-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer`}
			onClick={onClick}>
			<FontAwesomeIcon icon={icon} className="fa-lg text-white" />

			{showBadge && (
				<>
					<span className="absolute top-0 right-0 inline-flex h-3 w-3 animate-ping rounded-full bg-red-400 opacity-75"></span>
					<span className="absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-red-500"></span>
				</>
			)}
		</div>
	);
}
