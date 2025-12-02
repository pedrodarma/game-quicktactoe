import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { CircularButton } from '../../../@design_system/buttons/circular.button';

interface Props {
	onClick: () => void;
}
export function ChatButtonView({ onClick = () => {} }: Props) {
	return (
		<div className="fixed top-4 right-2 z-50 sm:top-10 sm:right-10 scale-80 sm:scale-100">
			<CircularButton icon={faMessage} onClick={onClick} />
		</div>
	);
}
