'use client';

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { GameProviderType } from './game.provider.types';
import useGameState from './states/game.state';

export const GameContext = createContext<GameProviderType | undefined>(
	undefined,
);

interface Props {
	children: ReactNode;
}

export function GameProvider({ children }: Props) {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const [gameState, gameActions] = useGameState();

	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
	const AppStates = {
		gameState,
	};

	useEffect(() => {
		//
	}, []);

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const AppActions = {
		...gameActions,
	};

	return (
		<GameContext.Provider value={{ ...AppStates, ...AppActions }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGameContext() {
	const context = useContext(GameContext);

	if (context === undefined) {
		throw new Error("You must use 'useAppContext' within an 'AppProvider'");
	}

	return context;
}
