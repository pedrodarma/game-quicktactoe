import { cn } from '../utils';

interface Props {
	className?: string;
	strokeWidth?: number;
}

/** The X piece. Colour comes from `currentColor` (defaults to `text-x`). */
export function XMark({ className, strokeWidth = 13 }: Props) {
	return (
		<svg
			viewBox="0 0 100 100"
			aria-hidden="true"
			className={cn('text-x', className)}>
			<path
				d="M24 24L76 76M76 24L24 76"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				fill="none"
			/>
		</svg>
	);
}

/** The O piece. Colour comes from `currentColor` (defaults to `text-o`). */
export function OMark({ className, strokeWidth = 13 }: Props) {
	return (
		<svg
			viewBox="0 0 100 100"
			aria-hidden="true"
			className={cn('text-o', className)}>
			<circle
				cx="50"
				cy="50"
				r="27"
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
}

export function Mark({
	symbol,
	...props
}: Props & { symbol: 'X' | 'O' | undefined }) {
	if (symbol === 'X') return <XMark {...props} />;
	if (symbol === 'O') return <OMark {...props} />;
	return null;
}
