import Constants from '@constants';
import { User } from '@models';

export const UserService = {
	list: _list,
	get: _get,
};

async function _list(): Promise<User[]> {
	try {
		const response = await fetch(`${Constants.API}/users`);

		if (response.status !== 200) {
			throw new Error('Failed to fetch Users');
		}

		const data: User[] = await response.json();

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

		if (response.status !== 200) {
			throw new Error('Failed to fetch User');
		}

		const data = await response.text();

		if (!data || data === '') {
			throw new Error('User not found');
		}

		const user: User = JSON.parse(data);

		return user;
	} catch (error) {
		throw error;
	}
}
