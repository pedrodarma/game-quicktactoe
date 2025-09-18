'use client';

import { DataValue, User, WebSocketMessage } from '@models';
// import { IPService } from '@services';
import { useEffect, useRef, useState } from 'react';

interface WebSockerState {
	userId?: string;
	ip?: string;
	status: string;
	messages: WebSocketMessage[];
	lastMessage?: WebSocketMessage;
}

enum ReadyState {
	UNINSTANTIATED = -1,
	CONNECTING = 0,
	OPEN = 1,
	CLOSING = 2,
	CLOSED = 3,
}

const connectionStatus = {
	[ReadyState.CONNECTING]: 'Connecting',
	[ReadyState.OPEN]: 'Open',
	[ReadyState.CLOSING]: 'Closing',
	[ReadyState.CLOSED]: 'Closed',
	[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface Props {
	url: string;
	onMessage: (message: WebSocketMessage) => void;
}

export default function useWebSocketState({ url, onMessage }: Props) {
	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	const state = useRef<WebSockerState>({
		userId: undefined,
		ip: undefined,
		status: connectionStatus[ReadyState.UNINSTANTIATED],
		messages: [],
		lastMessage: undefined,
	});

	// const [url, setUrl] = useState<string>();
	const _ws = useRef<WebSocket | null>(null);
	const [readyState, setReadyState] = useState<ReadyState>(
		ReadyState.UNINSTANTIATED,
	);

	useEffect(() => {
		_initialize();

		const timer = setInterval(() => {
			sendMessage(JSON.stringify({ type: 'ping' }));
		}, 3000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (state.current.status === connectionStatus[ReadyState.UNINSTANTIATED]) {
			return;
		}
		if (state.current.status === connectionStatus[ReadyState.CLOSED]) {
			_reconnect();
		}
	}, [readyState]);

	// useEffect(() => {
	// 	_connect();
	// }, [url]);

	//  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
	//  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
	//  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝
	async function _initialize() {
		// _fetchIP();
		_connect();
	}

	// async function _fetchIP() {
	// 	const ip = await IPService.getCurrent();
	// 	// setUrl(`${_url}?ip=${ip}`);
	// }

	function _localUser(): User | undefined {
		try {
			const user: User = JSON.parse(localStorage.getItem('user') || '{}');
			return user.id ? user : undefined;
		} catch {
			return undefined;
		}
	}

	// ===================================================================
	// ===================================================================
	// ===================================================================

	async function _connect() {
		_disconnect();

		if (url) {
			const user = _localUser();
			let _url: string = url;
			if (user) {
				_url = `${url}?user=${user.id}`;
			}
			_ws.current = new WebSocket(_url);

			_ws.current.onopen = _onOpen;

			_ws.current.onmessage = (event) => {
				if (event.data === 'ping' || event.data?.data === 'ping') {
					_ws.current?.send(JSON.stringify({ type: 'pong' }));
					return;
				}
				if (event.data === 'pong' || event.data?.data === 'pong') {
					return;
				}
				_onMessage(JSON.parse(event.data) as WebSocketMessage);
			};

			_ws.current.onclose = _onClose;

			_ws.current.onerror = _onError;
		}
	}

	async function _disconnect() {
		try {
			if (_ws.current) {
				_ws.current.close();
				_ws.current = null;
			}
		} catch (error) {
			//
		}
	}

	async function _reconnect() {
		setReadyState(ReadyState.CONNECTING);
		state.current.status = connectionStatus[ReadyState.CONNECTING];
		await delay(1000);
		_connect();
	}

	async function _onOpen() {
		setReadyState(ReadyState.OPEN);
		state.current.status = connectionStatus[ReadyState.OPEN];
	}

	async function _onError(error: Event) {
		// console.error('WebSocket error:', error);
	}

	async function _onClose(event: CloseEvent) {
		setReadyState(ReadyState.CLOSED);
		state.current.status = connectionStatus[ReadyState.CLOSED];
	}

	async function _onMessage(message: WebSocketMessage) {
		try {
			if (message.type === 'registered') {
				const userId = message.data?.id;
				if (typeof userId === 'string') {
					state.current.userId = userId;
				}
			}
			state.current.lastMessage = message;
			state.current.messages = [...state.current.messages, message];

			onMessage?.(message);
		} catch {
			//
		}
	}

	async function sendMessage(message: string) {
		if (
			_ws.current &&
			state.current.status === connectionStatus[ReadyState.OPEN]
		) {
			_ws.current.send(message);
		}
	}

	// ===================================================================
	// ===================================================================
	// ===================================================================

	interface SendActionProps {
		from: string;
		to: string;
		type: string;
	}

	async function _sendAction({ from, to, type }: SendActionProps) {
		const message: WebSocketMessage = {
			type: 'action',
			from,
			to,
			data: {
				action: type,
			},
		};
		if (state.current.status === connectionStatus[ReadyState.OPEN]) {
			sendMessage(JSON.stringify(message));

			state.current.lastMessage = message;
		}
	}

	interface SendMessageProps {
		to?: string;
		text: string;
	}
	async function _sendMessage({ to, text }: SendMessageProps) {
		const message: WebSocketMessage = {
			type: 'chat',
			from: state.current.userId || 'anonymous',
			to,
			data: {
				message: text,
				// ...data,
			},
		};
		if (state.current.status === connectionStatus[ReadyState.OPEN]) {
			sendMessage(JSON.stringify(message));

			// state.current.messages = [...state.current.messages, message];
			state.current.lastMessage = message;
		}
	}

	async function _sendEvent({
		from,
		to,
		type,
		data,
	}: {
		from: string;
		to: string;
		type: string;
		data?: DataValue;
	}) {
		const message: WebSocketMessage = {
			type: 'event',
			from,
			to,
			data: {
				event: type,
			},
		};
		if (state.current.status === connectionStatus[ReadyState.OPEN]) {
			sendMessage(JSON.stringify(message));

			state.current.lastMessage = message;
		}
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const _actions_ = {
		sendAction: _sendAction,
		sendMessage: _sendMessage,
		sendEvent: _sendEvent,
		getMessages: () => state.current.messages,
	};

	return [state, _actions_] as [typeof state, typeof _actions_];
}
