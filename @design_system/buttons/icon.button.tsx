import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Required: icon-only buttons need an accessible name. */
	'aria-label': string;
	icon: ReactNode;
	showBadge?: boolean;
	tone?: 'surface' | 'ground';
}

export const iconButtonClasses = (
	tone: 'surface' | 'ground' = 'surface',
	className?: string,
) =>
	cn(
		'relative inline-flex size-11 shrink-0 items-center justify-center rounded-[14px] border border-line text-ink-2 transition-colors duration-200 hover:text-ink cursor-pointer',
		tone === 'surface' ? 'bg-surface hover:bg-surface-2' : 'bg-ground',
		className,
	);

export function IconButton({
	icon,
	showBadge = false,
	tone = 'surface',
	className,
	type = 'button',
	...rest
}: Props) {
	return (
		<button type={type} className={iconButtonClasses(tone, className)} {...rest}>
			{icon}
			{showBadge && (
				<span
					aria-hidden="true"
					className="absolute top-2 right-2 size-[9px] rounded-full bg-x ring-2 ring-surface"
				/>
			)}
		</button>
	);
}
