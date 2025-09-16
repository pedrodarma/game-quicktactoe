export interface Game {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	status: 'waiting' | 'playing' | 'finished';
	currentPlayers: number;
	watchers: number;
	maxPlayers: number;
	minPlayers: number;
	// id: string;
	// playerX: string;
	// playerO: string;
	// board: string[][];
	// turn: 'X' | 'O';
	// status: 'waiting' | 'playing' | 'finished';
	// winner: 'X' | 'O' | 'draw' | null;
}
