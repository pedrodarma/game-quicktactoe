import { WebSocketMessage } from '@models';

interface Props {
	message: WebSocketMessage;
}

export function OthersMessageView({ message }: Props) {
	return (
		<div className="flex flex-row gap-2">
			<div className="bg-gray-500 size-8 px-1 py-1 rounded-full max-w-xs text-sm">
				<span
					className="text-gray-100 dark:text-gray-100 material-icons-round scale-130"
					style={{ cursor: 'pointer' }}>
					person
				</span>
			</div>
			<div className="bg-gray-300 text-gray-700 px-3 rounded-2xl max-w-xs text-sm flex items-center">
				{message.data.message?.toString()}
			</div>
		</div>
	);
}
