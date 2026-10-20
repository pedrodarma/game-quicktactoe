import { ReactNode } from 'react';
import { cn } from '../utils';

export function SmallTitle({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<h3 className={cn('text-base font-bold text-ink', className)}>
			{children}
		</h3>
	);
}
