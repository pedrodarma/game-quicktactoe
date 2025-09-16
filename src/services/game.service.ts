import Constants from '@constants';
import { Game } from '@models';

export const GameService = {
	create: _create,
	listLive: _listLive,
};

async function _create(): Promise<string> {
	try {
		const data = await fetch(`${Constants.API}/game/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				gameId: 'QTT',
			}),
		});

		if (data.status !== 200) {
			throw new Error('Failed to create game');
		}

		const response = await data.json();
		return response.id;
	} catch (error) {
		throw error;
	}
}

async function _listLive(): Promise<Game[]> {
	try {
		const data = await fetch(`${Constants.API}/games/live`);
		const response = await data.json();

		if (data.status !== 200) {
			throw new Error('Failed to fetch live games');
		}
		return response.games || [];
	} catch (error) {
		throw error;
	}
}
