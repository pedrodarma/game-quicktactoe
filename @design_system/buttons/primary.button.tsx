import { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonClasses, ButtonSize } from './button.styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	size?: ButtonSize;
	icon?: ReactNode;
}

export function PrimaryButton({
	isLoading = false,
	disabled = false,
	size = 'md',
	icon,
	children,
	className,
	type = 'button',
	...rest
}: Props) {
	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			aria-busy={isLoading || undefined}
			className={buttonClasses(
				'primary',
				size,
				isLoading ? `cursor-progress ${className ?? ''}` : className,
			)}
			{...rest}>
			{icon}
			{children}
		</button>
	);
}
