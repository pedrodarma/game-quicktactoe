import { ReactNode } from 'react';
import { cn } from '../utils';

export function MediumText({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<p className={cn('text-[15px] leading-normal text-ink-2', className)}>
			{children}
		</p>
	);
}
