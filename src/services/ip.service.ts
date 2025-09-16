import Constants from '@constants';

export const IPService = {
	getCurrent: _getCurrent,
};

async function _getCurrent(): Promise<string> {
	try {
		const data = await fetch(Constants.API_IP);
		const ip = await data.text();

		if (data.status !== 200) {
			throw new Error('Failed to fetch IP address');
		}

		return ip;
	} catch (error) {
		throw error;
	}
}
