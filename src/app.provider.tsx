'use client';

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { AppProviderType } from './app.provider.types';
import { WebSocketMessage } from '@models';
import { useUserState } from './states/user.state';
import useWebSocketState from './states/websocket.state';

export const AppContext = createContext<AppProviderType | undefined>(undefined);

interface Props {
	children: ReactNode;
}

const url = `${process.env.NEXT_PUBLIC_API_BROKER}/chat`;

export function AppProvider({ children }: Props) {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const [userState, userActions] = useUserState();
	const [websocketState, websocketActions] = useWebSocketState({
		url,
		onMessage: _handleMessages,
	});

	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const AppStates = {
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
			return;
		}
		// console.log('Message received in AppProvider:', message);
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const AppActions = {
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
