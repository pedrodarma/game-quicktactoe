'use client';

import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { GameProviderType } from './game.provider.types';
import useGameState, { Player } from './states/game.state';
import { BoardCells, GameModes, WebSocketMessage } from '@models';
import useWebSocketGameState from './states/websocket-game.state';

export const GameContext = createContext<GameProviderType | undefined>(
	undefined,
);

interface Props {
	hash: string;
	children: ReactNode;
}

export function GameProvider({ hash, children }: Props) {
	const _url = `${process.env.NEXT_PUBLIC_API_BROKER}/game/`;

	//  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	// const [_hash, setHash] = useState<string>();
	const [gameState, gameActions] = useGameState();
	const [websocketState, websocketActions] = useWebSocketGameState({
		// url: `${_url}${_hash}`,
		onMessage: _handleMessages,
	});

	useEffect(() => {
		if (!hash || hash.length === 0) return;

		websocketActions.setUrl(`${_url}${hash}`);
		gameActions.setHash(hash);

		return () => {
			gameActions.cleanState();
			websocketActions.setUrl();
		};
	}, [hash]);

	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const AppStates = {
		gameState,
		websocketState,
	};

	async function _handleMessages(message: WebSocketMessage) {
		// console.log('Message received in GameProvider:', message);

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
		if (message.type === 'event' && message.data?.event === 'join') {
			gameActions.setPlayer(
				message.from,
				message.data?.symbol as 'X' | 'O',
				message.data?.name as string,
			);
			return;
		}
		if (message.type === 'event' && message.data?.event === 'start') {
			gameActions.setStatus('playing', message.data?.players as Player[]);
			return;
		}
		if (message.type === 'event' && message.data?.event === 'your_turn') {
			gameActions.setTurn(message.to as string);
			return;
		}
		if (message.type === 'event' && message.data?.event === 'game_over') {
			gameActions.setWinner(
				'game_over',
				message.data?.winner as string,
				message.data?.winningPositions as BoardCells[],
			);
			return;
		}

		// ACTIONS
		if (message.type === 'action' && message.data?.action === 'move') {
			gameActions.playMove(
				message.from,
				message.data?.position as string,
				message.data?.symbol as 'X' | 'O',
			);
			// gameActions.setWinner('game_over', message.data?.winner as string);
			return;
		}

		return;
		// console.log('Message received in AppProvider:', message);
	}

	async function _move(position: string): Promise<void> {
		// if (!isLocal) {
		const message = {
			type: 'action',
			from: gameState.turn,
			// from: userId,
			to: hash,
			data: {
				action: 'move',
				position: position,
			},
		};
		await websocketActions.sendMessage(JSON.stringify(message));

		// await gameActions.playMove(position);
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const AppActions = {
		...gameActions,
		...websocketActions,
		move: _move,
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
