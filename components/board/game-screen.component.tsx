'use client';

import { useState } from 'react';
import { useAppContext, useGameContext } from '@providers';
import { Player } from '../../src/states/game.state';
import {
	CREATE_MODE,
	gameModeFromHash,
	MOVE_DURATION,
	Outcome,
	outcomeCopy,
	Piece,
} from './game.utils';
import { useMoveTimer } from './hooks/use-move-timer';
import { PanelPlayer } from './views/clock-panel.view';
import { PlayingView } from './views/playing.view';
import { ResultView } from './views/result.view';
import { WaitingView } from './views/waiting.view';

/**
 * Connects the game state to the three game views:
 * waiting for players → playing → result.
 */
export function GameScreen() {
	const { gameState, move, timeout, cleanState } = useGameContext();
	const { userState, createGame } = useAppContext();
	const [isRestarting, setIsRestarting] = useState(false);

	const mode = gameModeFromHash(gameState.hash);
	const myId = userState?.id;
	const isMe = (id?: string) =>
		!!id && !!myId && (id === myId || id === `p2_${myId}`);

	const { playerX, playerO, turn, status, winner, winningPositions } =
		gameState;
	const hasWinner = winner !== undefined;
	const isFinished = status === 'finished' || hasWinner;
	const isPlaying = status === 'playing' && !isFinished;
	const isMyTurn = isPlaying && isMe(turn);

	const turnSymbol: Piece | undefined =
		turn && turn === playerX?.id
			? 'X'
			: turn && turn === playerO?.id
				? 'O'
				: undefined;

	const timeLeft = useMoveTimer({
		duration: MOVE_DURATION,
		running: isPlaying,
		resetKey: turn,
		onExpire: timeout,
	});

	// Which piece is "yours". Same-device games show both players as X and O.
	const mySymbol: Piece =
		mode === 'pvp' ? 'X' : isMe(playerO?.id) && !isMe(playerX?.id) ? 'O' : 'X';
	const myPlayer = mySymbol === 'X' ? playerX : playerO;
	const otherPlayer = mySymbol === 'X' ? playerO : playerX;
	const otherSymbol: Piece = mySymbol === 'X' ? 'O' : 'X';

	function _panel(
		player: Player | undefined,
		symbol: Piece,
		isMine: boolean,
	): PanelPlayer {
		const active = isPlaying && !!turn && turn === player?.id;

		if (mode === 'pvp') {
			return {
				symbol,
				title: `Player ${symbol}`,
				subtitle: player?.name,
				active,
			};
		}
		if (isMine) {
			return { symbol, title: 'You', subtitle: `Player ${symbol}`, active };
		}
		return {
			symbol,
			title: mode === 'bot' ? 'Bot' : 'Opponent',
			subtitle: player?.name ?? `Player ${symbol}`,
			active,
		};
	}

	const me = _panel(myPlayer, mySymbol, true);
	const opponent = _panel(otherPlayer, otherSymbol, false);

	function _turnLabel(): string | undefined {
		if (!turnSymbol) return undefined;
		if (mode === 'pvp') return `Player ${turnSymbol}’s turn`;
		if (isMe(turn)) return 'Your turn';
		return mode === 'bot' ? 'Bot’s turn' : 'Opponent’s turn';
	}

	async function _playAgain() {
		setIsRestarting(true);
		cleanState();
		try {
			await createGame(CREATE_MODE[mode]);
		} finally {
			setIsRestarting(false);
		}
	}

	if (isFinished) {
		const winnerSymbol: Piece | undefined =
			winner && winner === playerX?.id
				? 'X'
				: winner && winner === playerO?.id
					? 'O'
					: undefined;

		let outcome: Outcome;
		if (gameState.timeout) outcome = 'timeout';
		else if (!winnerSymbol) outcome = 'draw';
		else if (mode === 'pvp') outcome = winnerSymbol === 'X' ? 'x-wins' : 'o-wins';
		else outcome = winnerSymbol === mySymbol ? 'win' : 'lose';

		const copy = outcomeCopy(outcome, mode, winningPositions);

		return (
			<ResultView
				outcome={outcome}
				title={copy.title}
				subtitle={copy.subtitle}
				board={gameState.board}
				winningPositions={winningPositions}
				winnerSymbol={gameState.timeout ? undefined : winnerSymbol}
				players={[
					{ symbol: me.symbol, title: me.title, subtitle: me.subtitle },
					{
						symbol: opponent.symbol,
						title: opponent.title,
						subtitle: opponent.subtitle,
					},
				]}
				onPlayAgain={_playAgain}
				isRestarting={isRestarting}
			/>
		);
	}

	if (!isPlaying) {
		return <WaitingView mode={mode} />;
	}

	return (
		<PlayingView
			me={me}
			opponent={opponent}
			turn={turnSymbol ? { symbol: turnSymbol, label: _turnLabel()! } : undefined}
			board={gameState.board}
			canPlay={isMyTurn}
			ghostSymbol={isMyTurn ? turnSymbol : undefined}
			dimmed={!isMyTurn}
			timeLeft={timeLeft}
			duration={MOVE_DURATION}
			onMove={move}
		/>
	);
}
