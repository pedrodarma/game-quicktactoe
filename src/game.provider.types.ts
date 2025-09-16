import useGameState from './states/game.state';

type GameActions = ReturnType<typeof useGameState>[1];

export interface GameProviderType extends GameActions {
	gameState: ReturnType<typeof useGameState>[0];
}
