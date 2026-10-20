import { ReactNode } from 'react';
import { cn } from '../utils';

export function LargeText({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<p
			className={cn(
				'text-base leading-[1.45] text-ink-2 lg:text-lg lg:leading-[1.5]',
				className,
			)}>
			{children}
		</p>
	);
}
