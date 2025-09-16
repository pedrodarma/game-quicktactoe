interface Props {
	onClose: () => void;
}

export function ChatHeaderView({ onClose = () => {} }: Props) {
	return (
		<div className="flex flex-row justify-between items-center gap-2">
			<div className="font-bold text-black">Chat</div>
			<span
				className="text-black dark:text-black material-icons-round"
				style={{ cursor: 'pointer' }}
				onClick={onClose}>
				close
			</span>
		</div>
	);
}
