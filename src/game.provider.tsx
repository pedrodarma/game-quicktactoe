'use client';

import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
} from 'react';
import { GameProviderType } from './game.provider.types';
import useGameState from './states/game.state';
import { WebSocketMessage } from '@models';
import useWebSocketGameState from './states/websocket-game.state';

export const GameContext = createContext<GameProviderType | undefined>(
	undefined,
);

interface Props {
	hash: string;
	userId: string;
	children: ReactNode;
}

export function GameProvider({ userId, hash, children }: Props) {
	const _url = `${process.env.NEXT_PUBLIC_API_BROKER}/game/`;
	// console.log('GameProvider initialized with hash:', { hash });
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const [gameState, gameActions] = useGameState();
	const [websocketState, websocketActions] = useWebSocketGameState({
		url: `${_url}${hash}`,
		onMessage: _handleMessages,
	});

	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const AppStates = {
		gameState,
		websocketState,
	};

	useEffect(() => {
		//
	}, []);

	async function _handleMessages(message: WebSocketMessage) {
		// Handle the message as needed
		console.log('Message received in GameProvider:', message);

		if (message.type === 'registered') {
			const userId = message.data?.id;
			if (typeof userId === 'string') {
				// userActions.register(userId);
			}
			return;
		}
		if (
			message.type === 'event' &&
			(message.data?.event === 'user_disconnected' ||
				message.data?.event === 'new_user')
		) {
			// fetch the user list again
			// const users = await UserService.list();
			// console.log('Fetched users:', { users });
			// setUsers(users);
			// userActions.setUsers(users);
			// console.log('Updated user list:', users);
			return;
		}
		// console.log('Message received in AppProvider:', message);
	}

	async function _playMove(position: string) {
		const message = {
			type: 'action',
			from: userId,
			to: hash,
			data: {
				action: 'move',
				position: position,
			},
		};
		await websocketActions.sendMessage(JSON.stringify(message));

		return gameActions.playMove(position);
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const AppActions = {
		...gameActions,
		...websocketActions,
		playMove: _playMove,
	};

	return useMemo(() => {
		return (
			<GameContext.Provider value={{ ...AppStates, ...AppActions }}>
				{children}
			</GameContext.Provider>
		);
	}, [hash, AppActions, AppStates]);
}

export function useGameContext() {
	const context = useContext(GameContext);

	if (context === undefined) {
		throw new Error("You must use 'useAppContext' within an 'AppProvider'");
	}

	return context;
}
