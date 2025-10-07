import { GameModes, User } from '@models';
import { useUserState } from './states/user.state';
import useWebSocketState from './states/websocket.state';

type UserActions = ReturnType<typeof useUserState>[1];
type WSActions = ReturnType<typeof useWebSocketState>[1];

export interface AppProviderType extends WSActions, UserActions {
	users: User[];
	createGame: (gameMode: GameModes) => Promise<void>;
	userState: ReturnType<typeof useUserState>[0];
	websocketState: ReturnType<typeof useWebSocketState>[0];
}
