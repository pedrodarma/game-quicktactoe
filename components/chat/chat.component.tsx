'use client';

import { useEffect, useRef, useState } from 'react';
// import { StatusView } from './views/connection-status.view';

import { ChatButtonView } from './views/chat-button.view';
import { ChatHeaderView } from './views/header.view';
import { InputView } from './views/input.view';
import { useAppContext } from '@providers';
import { WebSocketMessage } from '@models';
import { MyMessageView } from './views/my-message.view';
import { OthersMessageView } from './views/others-message.view';

export function Chat() {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [messages, setMessages] = useState<WebSocketMessage[]>([]);
	const { getMessages, websocketState } = useAppContext();

	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setMounted(true);
		// bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
		const timer = setInterval(() => {
			const _messages = getMessages();
			if (messages.length === _messages.length) {
				return;
			}
			setMessages((prevMessages) =>
				_messages.filter((msg) => msg.type === 'chat'),
			);
			// if (autoScroll) {
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
			// }
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	if (!mounted) return null;

	return (
		<>
			<ChatButtonView
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>

			<div
				className={`fixed top-0 bottom-0 transition-all duration-300 ${
					isOpen ? 'right-0' : '-right-200'
				} z-50 bg-white w-sm  border-l border-gray-200 dark:bg-gray-200 dark:border-gray-800`}>
				<div className="p-3">
					<ChatHeaderView
						onClose={() => {
							setIsOpen(false);
						}}
					/>
				</div>

				<div
					className={`flex flex-col overflow-y-auto mb-1 scrollbar-hidden h-full [max-height:calc(100dvh-120px)]`}>
					<div className="flex flex-col gap-2 mb-0 px-3 h-full">
						{messages.map((message, index) =>
							message.from === websocketState.current.userId ? (
								<MyMessageView key={index} message={message} />
							) : (
								<OthersMessageView key={index} message={message} />
							),
						)}
					</div>
					<div className="mt-0" ref={bottomRef} />
				</div>

				<InputView />
			</div>
		</>
	);
}

function useKeyboardStatus() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		let initialHeight = window.innerHeight;

		const handleResize = () => {
			const diff = initialHeight - window.innerHeight;
			setIsOpen(diff > 150); // se diminuiu mais que ~150px, teclado aberto
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isOpen;
}
