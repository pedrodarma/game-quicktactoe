import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
	onClose: () => void;
}

export function ChatHeaderView({ onClose = () => {} }: Props) {
	return (
		<div className="flex flex-row justify-between items-center gap-2">
			<div className="font-bold text-black">Chat</div>
			<FontAwesomeIcon
				icon={faXmark}
				className="fa-lg text-black"
				onClick={onClose}
			/>
			{/* <span
				id="close-chat-button"
				className="text-black dark:text-black material-icons-round"
				style={{ cursor: 'pointer' }}
				onClick={onClose}>
				close
			</span> */}
		</div>
	);
}
