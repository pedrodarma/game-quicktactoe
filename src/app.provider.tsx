'use client';

import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { AppProviderType } from './app.provider.types';
import { User, WebSocketMessage } from '@models';
import { useUserState } from './states/user.state';
import useWebSocketState from './states/websocket.state';
import { GameService, UserService } from '@services';
import { useRouter } from 'next/navigation';

export const AppContext = createContext<AppProviderType | undefined>(undefined);

interface Props {
	children: ReactNode;
}

export function AppProvider({ children }: Props) {
	const _url = `${process.env.NEXT_PUBLIC_API_BROKER}/chat`;
	const router = useRouter();

	//  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const [users, setUsers] = useState<User[]>([]); // Example state
	const [userState, userActions] = useUserState();
	const [websocketState, websocketActions] = useWebSocketState({
		url: _url,
		onMessage: useCallback(_handleMessages, [_url]),
	});

	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const AppStates = {
		users,
		userState,
		websocketState,
	};

	useEffect(() => {
		//
	}, []);

	async function _handleMessages(message: WebSocketMessage) {
		// Handle the message as needed

		if (message.type === 'registered') {
			const userId = message.data?.id;
			if (typeof userId === 'string') {
				userActions.register(userId);
			}
			return;
		}
		if (
			message.type === 'event' &&
			(message.data?.event === 'user_disconnected' ||
				message.data?.event === 'new_user')
		) {
			// fetch the user list again
			const users = await UserService.list();
			// console.log('Fetched users:', { users });
			setUsers(users);
			// userActions.setUsers(users);
			// console.log('Updated user list:', users);
			return;
		}
		// console.log('Message received in AppProvider:', message);
	}

	async function _createGame() {
		const gameHash = await GameService.create();
		router.push(`/game#${gameHash}`);

		// console.log({ gameHash });
		// router.push('/game/1234');
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const AppActions = {
		createGame: _createGame,
		...websocketActions,
		...userActions,
	};

	return (
		<AppContext.Provider value={{ ...AppStates, ...AppActions }}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error("You must use 'useAppContext' within an 'AppProvider'");
	}

	return context;
}
