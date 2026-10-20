import { ReactNode } from 'react';
import { cn } from '../utils';

export function LargeTitle({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<h1
			className={cn(
				'font-display text-[2.375rem] leading-[1.04] font-extrabold tracking-[-0.03em] text-ink lg:text-[clamp(2.25rem,5vw,4.5rem)] lg:leading-[1.02] lg:tracking-[-0.035em]',
				className,
			)}>
			{children}
		</h1>
	);
}
