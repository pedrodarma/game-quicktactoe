'use client';

import { useEffect, useState } from 'react';
import {
	ConnectionStatus,
	StatusDot,
	statusLabel,
	StatusPill,
} from '@design_system';

interface Props {
	/** The websocket state ref exposed by the app or game provider. */
	websocketState: { current: { status: string } };
	/** Optional text instead of "Online" / "Offline". */
	label?: string;
	variant?: 'pill' | 'dot' | 'inline';
	className?: string;
}

/** Polls a websocket state ref and shows its connection status. */
export function ConnectionStatusView({
	websocketState,
	label,
	variant = 'pill',
	className,
}: Props) {
	const [status, setStatus] = useState<ConnectionStatus>(
		websocketState.current.status as ConnectionStatus,
	);

	useEffect(() => {
		const read = () =>
			setStatus(websocketState.current.status as ConnectionStatus);
		read();
		const timer = setInterval(read, 1000);
		return () => clearInterval(timer);
	}, [websocketState]);

	if (variant === 'dot') {
		return (
			<span className={className} title={statusLabel(status)}>
				<StatusDot status={status} />
				<span className="sr-only">{statusLabel(status)}</span>
			</span>
		);
	}

	if (variant === 'inline') {
		return (
			<span
				className={`inline-flex items-center gap-1.5 text-xs font-semibold text-muted ${className ?? ''}`}>
				<StatusDot status={status} className="size-1.5" />
				<span>{label ?? statusLabel(status)}</span>
				{label && <span className="sr-only">, {statusLabel(status)}</span>}
			</span>
		);
	}

	return (
		<StatusPill
			status={status}
			label={label}
			className={className}
		/>
	);
}
