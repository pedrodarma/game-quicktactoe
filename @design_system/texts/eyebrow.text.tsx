import { ReactNode } from 'react';
import { cn } from '../utils';

/** Small monospaced, uppercase label shown above titles. */
export function Eyebrow({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-muted uppercase lg:text-[13px]',
				className,
			)}>
			{children}
		</div>
	);
}
