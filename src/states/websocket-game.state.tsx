'use client';

import { DataValue, User, WebSocketMessage } from '@models';
import { IPService } from '@services';
import { useEffect, useRef, useState } from 'react';

interface WebSocketState {
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

export default function useWebSocketGameState({ url, onMessage }: Props) {
	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	const state = useRef<WebSocketState>({
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
			_sendMessage(JSON.stringify({ type: 'ping' }));
		}, 3000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (state.current.status === connectionStatus[ReadyState.UNINSTANTIATED]) {
			return;
		}
		if (state.current.status === connectionStatus[ReadyState.CLOSED]) {
			// _reconnect();
		}
	}, [readyState]);

	// useEffect(() => {
	// 	_connect();
	// }, [url]);

	//  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
	//  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
	//  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝
	async function _initialize() {
		await delay(2500);
		// _fetchIP();
		_connect();
	}

	async function _fetchIP() {
		const ip = await IPService.getCurrent();
		// setUrl(`${_url}?ip=${ip}`);
	}

	function _localUser(): User | undefined {
		try {
			const user: User = JSON.parse(localStorage.getItem('user') || '{}');
			state.current.userId = user?.id;
			return user?.id ? user : undefined;
		} catch {
			return undefined;
		}
	}

	// ===================================================================
	// ===================================================================
	// ===================================================================

	async function _connect() {
		// _disconnect();

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

				onMessage(JSON.parse(event.data) as WebSocketMessage);
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
		} catch {
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
		if (readyState !== ReadyState.OPEN) {
			setReadyState(ReadyState.OPEN);
			state.current.status = connectionStatus[ReadyState.OPEN];
		}
	}

	async function _onError(error: Event) {
		//
	}

	async function _onClose(event: CloseEvent) {
		if (readyState !== ReadyState.CLOSED) {
			setReadyState(ReadyState.CLOSED);
			state.current.status = connectionStatus[ReadyState.CLOSED];
		}
	}

	async function _sendMessage(message: string) {
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

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const _actions_ = {
		sendMessage: _sendMessage,
	};

	return [state, _actions_] as [typeof state, typeof _actions_];
}
