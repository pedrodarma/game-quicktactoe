import { cn } from '../utils';

export function LogoMark({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 32 32"
			aria-hidden="true"
			className={cn('size-8 shrink-0', className)}>
			<rect
				x="0.75"
				y="0.75"
				width="30.5"
				height="30.5"
				rx="9"
				className="fill-surface stroke-line"
				strokeWidth="1.5"
			/>
			<path
				d="M8 8l6 6M14 8l-6 6"
				className="stroke-x"
				strokeWidth="2.6"
				strokeLinecap="round"
				fill="none"
			/>
			<circle
				cx="21"
				cy="21"
				r="3.6"
				fill="none"
				className="stroke-o"
				strokeWidth="2.6"
			/>
		</svg>
	);
}

export function Wordmark({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				'font-display text-[17px] font-bold tracking-[-0.01em] text-ink',
				className,
			)}>
			QuickTacToe
		</span>
	);
}

export function Logo({
	className,
	markClassName,
	wordmarkClassName,
}: {
	className?: string;
	markClassName?: string;
	wordmarkClassName?: string;
}) {
	return (
		<span className={cn('inline-flex items-center gap-2.5', className)}>
			<LogoMark className={markClassName} />
			<Wordmark className={wordmarkClassName} />
		</span>
	);
}
