'use client';

import { DataValue, Game, WebSocketMessage } from '@models';
import { GameService } from '@services';
import { useEffect, useRef, useState } from 'react';
import Constants from '@constants';

interface GameState {
	// currentGame?: Game;
	hash?: string;
	gamesLive: Game[];
	board: Record<string, string[]>;

	// board: Constants.cleanBoard;
}

export default function useWebSocketState() {
	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	const [state, setState] = useState<GameState>({
		gamesLive: [],
		board: Constants.cleanBoard,
	});

	useEffect(() => {
		// _initialize();

		return () => {
			//
		};
	}, []);

	//  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
	//  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
	//  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝
	async function _initialize() {
		_fetchGamesLive();

		if (state.gamesLive.length === 0) {
			const gameId = await _create();
			// console.log('Created game with ID:', gameId);
			_fetchGamesLive();
		}
	}

	async function _fetchGamesLive() {
		try {
			const games = await GameService.listLive();
			setState((current) => ({ ...current, gamesLive: games }));
		} catch (error) {
			// console.error('Error fetching live games:', error);
		}
	}

	async function _create() {
		try {
			const gameId = await GameService.create();
			return gameId;
		} catch (error) {
			throw error;
		}
	}

	async function _playMove(position: string) {
		// a1, b2, c3, etc
		const row = position.charAt(0);
		const col = parseInt(position.charAt(1), 10);
		try {
			const newBoard = { ...state.board };
			if (newBoard[row][col] === '-') {
				// newBoard[row][col] = player;
				newBoard[row][col] = 'X';
				setState((current) => ({ ...current, board: newBoard }));
			} else {
				// console.warn('Invalid move, position already taken');
			}
			return newBoard;
		} catch (error) {
			// console.error('Error playing move:', error);
		}
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const _actions_ = {
		playMove: _playMove,
		// createGame: _create,
		// sendAction: _sendAction,
		// sendCommand: _sendCommand,
		// sendEvent: _sendEvent,
		// getMessages: () => state.current.messages,
	};

	return [state, _actions_] as [typeof state, typeof _actions_];
}
