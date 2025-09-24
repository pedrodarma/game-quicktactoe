import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WebSocketMessage } from '@models';

interface Props {
	message: WebSocketMessage;
}

export function OthersMessageView({ message }: Props) {
	return (
		<div className="flex flex-row gap-2">
			<div className="bg-gray-500 size-8 rounded-full max-w-xs text-sm text-center flex items-center justify-center">
				<FontAwesomeIcon icon={faUser} className="fa-xl text-white" />
			</div>
			<div className="bg-gray-300 text-gray-700 px-3 rounded-2xl max-w-xs text-sm flex items-center">
				{message.data.message?.toString()}
			</div>
		</div>
	);
}
