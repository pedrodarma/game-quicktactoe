import useGameState from './states/game.state';
import useWebSocketGameState from './states/websocket-game.state';

type GameActions = ReturnType<typeof useGameState>[1];
type WSActions = ReturnType<typeof useWebSocketGameState>[1];

export interface GameProviderType extends GameActions, WSActions {
	gameState: ReturnType<typeof useGameState>[0];
	websocketState: ReturnType<typeof useWebSocketGameState>[0];
}
