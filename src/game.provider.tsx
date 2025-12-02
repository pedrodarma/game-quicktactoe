'use client';

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { GameProviderType } from './game.provider.types';
import useGameState, { Player } from './states/game.state';
import { BoardCells, WebSocketMessage } from '@models';
import useWebSocketGameState from './states/websocket-game.state';
import { useAppContext } from './app.provider';

export const GameContext = createContext<GameProviderType | undefined>(
	undefined,
);

interface Props {
	hash: string;
	children: ReactNode;
}

export function GameProvider({ hash, children }: Props) {
	const _url = `${process.env.NEXT_PUBLIC_API_BROKER}/game/`;

	const { userState } = useAppContext();

	//  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const [gameState, gameActions] = useGameState();
	const [websocketState, websocketActions] = useWebSocketGameState({
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
		if (message.type === 'registered') {
			const userId = message.data?.id;
			if (typeof userId === 'string') {
				//
			}
			return;
		}
		if (
			message.type === 'event' &&
			(message.data?.event === 'user_disconnected' ||
				message.data?.event === 'new_user')
		) {
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
				'finished',
				message.data?.winner as string | undefined,
				message.data?.winningPositions as BoardCells[] | undefined,
			);
			return;
		}
		if (message.type === 'event' && message.data?.event === 'timeout') {
			gameActions.setTimeout();
			return;
		}

		// ACTIONS
		if (message.type === 'action' && message.data?.action === 'move') {
			gameActions.playMove(
				message.data?.position as string,
				message.data?.symbol as 'X' | 'O',
			);
			return;
		}

		return;
	}

	async function _move(position: string): Promise<void> {
		const hasWinner = gameState.winner !== undefined;
		if (hasWinner) return;
		if (gameState.status === 'waiting') return;
		if (gameState.status === 'finished') return;
		if (
			gameState.turn === userState?.id ||
			gameState.turn === `p2_${userState?.id}`
		) {
			const message = {
				type: 'action',
				from: gameState.turn,
				to: hash,
				data: {
					action: 'move',
					position: position,
				},
			};
			await websocketActions.sendMessage(JSON.stringify(message));
		}
	}

	async function _timeout() {
		const message = {
			type: 'event',
			from: userState?.id,
			to: hash,
			data: {
				event: 'timeout',
				timestamp: Date.now(),
			},
		};
		await websocketActions.sendMessage(JSON.stringify(message));
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const AppActions = {
		...gameActions,
		...websocketActions,
		move: _move,
		timeout: _timeout,
	};

	return (
		<GameContext.Provider value={{ ...AppStates, ...AppActions }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGameContext() {
	const context = useContext(GameContext);

	if (context === undefined) {
		throw new Error("You must use 'useAppContext' within an 'AppProvider'");
	}

	return context;
}
