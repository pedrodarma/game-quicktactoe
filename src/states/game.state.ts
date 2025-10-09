'use client';

import { BoardCells } from '@models';
import { useEffect, useState } from 'react';

type GameRoomStatus = 'waiting' | 'playing' | 'finished';

interface GameState {
	hash?: string;
	board?: Record<string, string[]>;
	status?: GameRoomStatus;
	turn?: string;
	playerX?: Player;
	playerO?: Player;
	winner?: string;
	winningPositions?: BoardCells[];
	timeout?: boolean;
}

export interface Player {
	id: string;
	name?: string;
	symbol: 'X' | 'O';
}

export default function useGameState() {
	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	const [state, setState] = useState<GameState>({
		board: {
			a: ['-', '-', '-'],
			b: ['-', '-', '-'],
			c: ['-', '-', '-'],
		},
		playerX: undefined,
		playerO: undefined,
		status: 'waiting',
	});

	useEffect(() => {
		_initialize();

		return () => {
			setState({
				board: {
					a: ['-', '-', '-'],
					b: ['-', '-', '-'],
					c: ['-', '-', '-'],
				},
				playerX: undefined,
				playerO: undefined,
				status: 'waiting',
			});
		};
	}, []);

	//  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
	//  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
	//  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝
	async function _initialize() {
		// _cleanState();
	}

	async function _playMove(playerId: string, position: string, symbol: string) {
		if (state.winner) {
			// console.warn('Game over, no more moves allowed');
			return;
		}
		// if (state.turn !== playerId) {
		// 	console.warn("It's not your turn");
		// 	return;
		// }
		// if (!state.playerX || !state.playerO) {
		// 	console.warn('Players not set yet');
		// 	return;
		// }
		setState((current) => {
			const newBoard = { ...current.board };
			const row = position.charAt(0);
			const col = parseInt(position.charAt(1), 10);
			if (newBoard[row][col] === '-') {
				newBoard[row][col] = symbol;
				return { ...current, board: newBoard };
			} else {
				// console.warn('Invalid move, position already taken');
				return current;
			}
		});
	}

	async function _setPlayer(id: string, symbol: 'X' | 'O', name?: string) {
		if (symbol === 'X') {
			setState((current) => ({
				...current,
				playerX: { id, name, symbol },
			}));
		} else if (symbol === 'O') {
			setState((current) => ({
				...current,
				playerO: { id, name, symbol },
			}));
		}
	}

	async function _setStatus(status: GameRoomStatus, players: Player[]) {
		setState((current) => ({ ...current, status }));
		if (players.length === 2) {
			if (players[0].symbol === 'X') {
				_setPlayer(players[0].id, 'X', players[0].name);
				_setPlayer(players[1].id, 'O', players[1].name);
			} else {
				_setPlayer(players[1].id, 'X', players[1].name);
				_setPlayer(players[0].id, 'O', players[0].name);
			}
		}
	}

	async function _setWinner(
		status: GameRoomStatus,
		winner?: string,
		winningPositions?: BoardCells[],
	) {
		setState((current) => ({
			...current,
			status,
			winner: winner,
			winningPositions,
		}));
	}

	async function _setTurn(playerId: string) {
		setState((current) => ({ ...current, turn: playerId }));
	}

	async function _setTimeout() {
		setState((current) => ({ ...current, timeout: true, status: 'finished' }));
	}

	async function _cleanState() {
		setState({
			// hash: undefined,
			board: {
				a: ['-', '-', '-'],
				b: ['-', '-', '-'],
				c: ['-', '-', '-'],
			},
			playerX: undefined,
			playerO: undefined,
			status: 'waiting',
			winner: undefined,
			turn: undefined,
			winningPositions: undefined,
			timeout: undefined,
		});
	}

	async function _setHash(hash: string) {
		setState((current) => ({ ...current, hash }));
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const _actions_ = {
		playMove: _playMove,
		setHash: _setHash,
		setPlayer: _setPlayer,
		setTurn: _setTurn,
		setStatus: _setStatus,
		setWinner: _setWinner,
		setTimeout: _setTimeout,
		cleanState: _cleanState,
	};

	return [state, _actions_] as [typeof state, typeof _actions_];
}
