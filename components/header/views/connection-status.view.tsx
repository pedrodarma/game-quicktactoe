'use client';

// import { useWebsocketContext } from '@/src/providers/websocket.provider';
import { useEffect, useState } from 'react';

type _Status =
	| 'Connecting'
	| 'Open'
	| 'Closing'
	| 'Closed'
	| 'Error'
	| 'Uninstantiated';

export function StatusView() {
	// const { websocketState } = useWebsocketContext();
	const [status, setStatus] = useState<_Status>('Uninstantiated');

	// useEffect(() => {
	// 	const _status = websocketState.current.status as _Status;
	// 	setStatus(_status);
	// }, [websocketState.current.status]);

	const _colors = {
		Connecting: 'orange',
		Open: 'foreground',
		Closing: 'blue',
		Closed: 'red',
		Error: 'red',
		Uninstantiated: 'gray',
	};

	const _color = () => _colors[status] ?? 'red-300';

	return (
		<div className={`flex w-3 h-3 rounded-full`}>
			<div
				className={`w-3 h-3 rounded-full`}
				title={status}
				style={{
					// width: 10,
					// height: 10,
					backgroundColor: _color(),
					// borderRadius: '50%',
				}}></div>
			{/* {_color} */}
		</div>
	);
}
