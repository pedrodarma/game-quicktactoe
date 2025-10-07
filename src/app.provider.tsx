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
import { GameModes, User, WebSocketMessage } from '@models';
import { useUserState } from './states/user.state';
import useWebSocketState from './states/websocket.state';
import { GameService, UserService } from '@services';
import { useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const AppContext = createContext<AppProviderType | undefined>(undefined);

interface Props {
	children: ReactNode;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function AppProvider({ children }: Props) {
	const _url = `${process.env.NEXT_PUBLIC_API_BROKER}/chat`;
	const router = useRouter();

	//  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const [users, setUsers] = useState<User[]>([]);
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
			const users = await UserService.list();

			setUsers(users);
			return;
		}
	}

	async function _createGame(gameMode: GameModes = 'online') {
		const gameHash = await GameService.create({ gameMode });

		if (!gameHash) return;

		const options: NavigateOptions = { scroll: false };
		router.push(`/game#${gameHash}`, options);
		await delay(100);
		router.refresh();
		await delay(400);
		window?.location.reload();
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
