import { User } from '@models';
import { UserService } from '@services';
import { useEffect, useState } from 'react';

interface UserState {
	id: string;
	username: string;
	avatar?: string;
	createdAt: Date;
	updatedAt: Date;
}

export function useUserState() {
	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	const [state, setState] = useState<UserState>();

	useEffect(() => {
		_initialize();

		return () => {
			//
		};
	}, []);

	//  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
	//  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
	//  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝
	function _localUser(): User | undefined {
		try {
			const user: User = JSON.parse(localStorage.getItem('user') || '{}');
			return user.id ? user : undefined;
		} catch {
			return undefined;
		}
	}

	function _updateLocalUser(user: User) {
		try {
			localStorage.setItem('user', JSON.stringify(user));
		} catch {}
	}

	async function _initialize() {
		let _user: UserState;
		const local = _localUser();

		if (local) {
			const remote = await UserService.get({ id: local.id });

			if (remote) {
				_user = remote;
				_updateLocalUser(remote);
			} else {
				_user = local;
			}

			setState(_user);
		}
	}

	async function _register(userId: string) {
		const user = await UserService.get({ id: userId });
		if (user) {
			setState(user);
			_updateLocalUser(user);
		}
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const _actions_ = {
		register: _register,
		// fetchClient: _fetch,
	};

	return [state, _actions_] as [typeof state, typeof _actions_];
}
