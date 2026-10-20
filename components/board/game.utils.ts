import { BoardCells, GameModes } from '@models';

export type Piece = 'X' | 'O';
export type GameMode = 'online' | 'bot' | 'pvp';
export type Outcome = 'win' | 'lose' | 'draw' | 'timeout' | 'x-wins' | 'o-wins';

/** Seconds for the whole match (QuickTacToe is a 7-second game). */
export const MATCH_DURATION = 7;

export const MODE_LABEL: Record<GameMode, string> = {
	online: 'Online match',
	bot: 'Vs bot',
	pvp: 'Same device',
};

export const CREATE_MODE: Record<GameMode, GameModes> = {
	online: 'online',
	bot: 'local_bot',
	pvp: 'local_pvp',
};

export function gameModeFromHash(hash?: string): GameMode {
	if (hash?.includes('bot_')) return 'bot';
	if (hash?.includes('pvp_')) return 'pvp';
	return 'online';
}

/** Board values are '-' for empty and 'X'/'O' (any case) for pieces. */
export function cellSymbol(value?: string): Piece | undefined {
	const symbol = value?.replace('-', '').toUpperCase();
	return symbol === 'X' || symbol === 'O' ? symbol : undefined;
}

export function lineDirection(
	positions?: BoardCells[],
): 'across' | 'down' | 'diagonal' | undefined {
	if (!positions || positions.length < 3) return undefined;
	const rows = new Set(positions.map((p) => p.charAt(0)));
	const cols = new Set(positions.map((p) => p.charAt(1)));
	if (rows.size === 1) return 'across';
	if (cols.size === 1) return 'down';
	return 'diagonal';
}

const _lineCopy = {
	across: 'Three in a row across.',
	down: 'Three in a row, straight down.',
	diagonal: 'Three in a row on the diagonal.',
};

export function outcomeCopy(
	outcome: Outcome,
	mode: GameMode,
	positions?: BoardCells[],
): { title: string; subtitle: string } {
	const direction = lineDirection(positions);
	const line = direction ? _lineCopy[direction] : 'Three in a row.';

	switch (outcome) {
		case 'win':
			return { title: 'You win!', subtitle: `${line} Nicely played.` };
		case 'lose':
			return {
				title: 'You lose',
				subtitle:
					mode === 'bot'
						? 'The bot got three in a row first.'
						: 'Your opponent got three in a row first.',
			};
		case 'x-wins':
			return { title: 'Player X wins!', subtitle: line };
		case 'o-wins':
			return { title: 'Player O wins!', subtitle: line };
		case 'timeout':
			return {
				title: 'Time’s up!',
				subtitle: 'The clock hit zero before anyone got three in a row.',
			};
		case 'draw':
		default:
			return {
				title: 'It’s a draw',
				subtitle: 'Board full, nobody got three in a row.',
			};
	}
}

export const BOARD_ROWS = ['a', 'b', 'c'] as const;
