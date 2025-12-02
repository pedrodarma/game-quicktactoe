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
}
