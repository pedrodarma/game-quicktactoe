import Constants from '@constants';
import { User } from '@models';

export const UserService = {
	list: _list,
	get: _get,
};

async function _list(): Promise<User[]> {
	try {
		const response = await fetch(`${Constants.API}/users`);
		const data: User[] = await response.json();

		if (response.status !== 200) {
			throw new Error('Failed to fetch Users');
		}

		return data;
	} catch (error) {
		throw error;
	}
}

interface Props {
	id: string;
}

async function _get({ id }: Props): Promise<User> {
	try {
		const response = await fetch(`${Constants.API}/users/${id}`);
		const data: User = await response.json();

		if (response.status !== 200) {
			throw new Error('Failed to fetch User');
		}

		return data;
	} catch (error) {
		throw error;
	}
}
