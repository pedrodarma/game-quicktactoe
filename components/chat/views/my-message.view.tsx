import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WebSocketMessage } from '@models';

interface Props {
	message: WebSocketMessage;
}
export function MyMessageView({ message }: Props) {
	return (
		<div className="flex flex-row gap-2 justify-end">
			<div className="bg-blue-500 text-white px-3 rounded-2xl max-w-xs text-sm flex items-center">
				{message.data.message?.toString()}
			</div>
			<div className="bg-gray-600 size-8 px-1 py-1 rounded-full max-w-xs text-sm text-center">
				<FontAwesomeIcon icon={faUser} className="fa-lg text-white" />
			</div>
		</div>
	);
}
