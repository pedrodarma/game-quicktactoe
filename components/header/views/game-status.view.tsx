'use client';

import { useGameContext } from '@providers';
import { useEffect, useState } from 'react';

type _Status =
	| 'Connecting'
	| 'Open'
	| 'Closing'
	| 'Closed'
	| 'Error'
	| 'Uninstantiated';

export function GameStatusView() {
	const { websocketState } = useGameContext();
	const [status, setStatus] = useState<_Status>('Uninstantiated');

	useEffect(() => {
		const timer = setInterval(() => {
			const _status = websocketState.current.status as _Status;
			setStatus(_status);
		}, 100);
		return () => clearInterval(timer);
	}, []);

	const _colors = {
		Connecting: 'orange-500',
		Open: 'green-500',
		Closing: 'blue-500',
		Closed: 'red-300',
		Error: 'red-500',
		Uninstantiated: 'gray-500',
	};

	const _color = () => _colors[status] ?? 'red-300';

	return (
		<div className={`flex w-3 h-3 rounded-full`}>
			<div
				className={`w-3 h-3 rounded-full bg-${_color()}`}
				title={status}></div>
			{/* {_color} */}
		</div>
	);
}
