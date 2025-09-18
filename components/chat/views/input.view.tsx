import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '@providers';
import { useRef } from 'react';

export function InputView() {
	const { sendMessage } = useAppContext();
	const inputRef = useRef<HTMLInputElement>(null);

	function _sendMessage(text: string) {
		sendMessage({
			text: text,
		});
	}

	return (
		<div className="flex flex-row justify-between items-center gap-2 mb-2 p-3">
			<input
				id="chat-input"
				type="text"
				ref={inputRef}
				autoFocus
				placeholder="Type a message..."
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						const target = e.target as HTMLInputElement;
						const text = target.value.trim();
						if (text.length > 0) {
							_sendMessage(text);
							target.value = '';
						}
					}
				}}
			/>

			<FontAwesomeIcon
				icon={faPaperPlane}
				className="fa-lg text-black hover:text-green-600 transition-colors"
				onClick={() => {
					if (inputRef.current) {
						const text = inputRef.current.value.trim();
						if (text.length > 0) {
							_sendMessage(text);
							inputRef.current.value = '';
						}
					}
				}}
			/>
		</div>
	);
}
