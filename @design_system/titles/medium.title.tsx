import { ReactNode } from 'react';
import { cn } from '../utils';

export function MediumTitle({
	children,
	className,
	id,
}: {
	children: ReactNode;
	className?: string;
	id?: string;
}) {
	return (
		<h2
			id={id}
			className={cn(
				'font-display text-2xl leading-[1.1] font-extrabold tracking-[-0.02em] text-ink lg:text-[1.875rem]',
				className,
			)}>
			{children}
		</h2>
	);
}
