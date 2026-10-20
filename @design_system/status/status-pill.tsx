import { cn } from '../utils';

export type ConnectionStatus =
	| 'Connecting'
	| 'Open'
	| 'Closing'
	| 'Closed'
	| 'Error'
	| 'Uninstantiated';

// Full class names (not built at runtime) so Tailwind generates them.
const _dot: Record<ConnectionStatus, string> = {
	Open: 'bg-online',
	Connecting: 'bg-connecting',
	Closing: 'bg-connecting',
	Closed: 'bg-danger',
	Error: 'bg-danger',
	Uninstantiated: 'bg-offline',
};

const _label: Record<ConnectionStatus, string> = {
	Open: 'Online',
	Connecting: 'Connecting…',
	Closing: 'Disconnecting…',
	Closed: 'Offline',
	Error: 'Offline',
	Uninstantiated: 'Connecting…',
};

export function statusLabel(status: ConnectionStatus) {
	return _label[status] ?? 'Offline';
}

export function StatusDot({
	status,
	className,
}: {
	status: ConnectionStatus;
	className?: string;
}) {
	return (
		<span
			aria-hidden="true"
			className={cn(
				'inline-block size-[7px] shrink-0 rounded-full',
				_dot[status] ?? 'bg-offline',
				className,
			)}
		/>
	);
}

/** Small rounded label with a coloured dot, e.g. "● Online". */
export function StatusPill({
	status,
	label,
	className,
}: {
	status: ConnectionStatus;
	label?: string;
	className?: string;
}) {
	return (
		<span
			role="status"
			className={cn(
				'inline-flex h-7 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 text-xs font-semibold whitespace-nowrap text-ink-2',
				className,
			)}>
			<StatusDot status={status} />
			<span>{label ?? statusLabel(status)}</span>
		</span>
	);
}
