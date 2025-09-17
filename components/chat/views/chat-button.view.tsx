// import { useWebsocketContext } from '@/src/providers/websocket.provider';
// import { useEffect, useState } from 'react';

interface Props {
	onClick: () => void;
}
export function ChatButtonView({ onClick = () => {} }: Props) {
	return (
		<div className="fixed top-4 right-2 z-50 sm:top-10 sm:right-10 scale-80 sm:scale-100">
			<div
				id="chat-button"
				className="relative bg-blue-400 p-3 pb-1 rounded-full shadow-lg hover:shadow-xl transition-shadow"
				onClick={onClick}>
				{/* Ícone */}
				<span className="material-icons-round" style={{ cursor: 'pointer' }}>
					chat
				</span>

				{/* Bolinha de notificação */}
				<span className="absolute top-0 right-0 inline-flex h-3 w-3 animate-ping rounded-full bg-red-400 opacity-75"></span>
				<span className="absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-red-500"></span>
			</div>
		</div>
	);
}
