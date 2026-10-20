import { cn } from '../utils';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'lg';

const _base =
	'inline-flex items-center justify-center gap-2.5 select-none whitespace-nowrap transition-[background-color,opacity,color,border-color] duration-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer';

const _variants: Record<ButtonVariant, string> = {
	primary:
		'bg-primary text-on-primary font-display font-bold tracking-[-0.01em] hover:opacity-90',
	secondary:
		'border-[1.5px] border-line bg-transparent text-ink font-bold hover:bg-surface light:bg-surface light:hover:bg-surface-2',
};

const _sizes: Record<ButtonSize, string> = {
	md: 'h-14 rounded-[18px] px-6 text-[15px]',
	lg: 'h-15 rounded-[20px] px-7 text-base',
};

/**
 * Shared button look, so links (`next/link`) and buttons match.
 */
export function buttonClasses(
	variant: ButtonVariant = 'primary',
	size: ButtonSize = 'md',
	className?: string,
) {
	return cn(_base, _variants[variant], _sizes[size], className);
}
