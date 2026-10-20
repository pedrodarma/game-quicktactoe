import { ReactNode } from 'react';
import { cn } from '../utils';

export function SmallText({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<p className={cn('text-[13px] leading-[1.4] text-muted', className)}>
			{children}
		</p>
	);
}
