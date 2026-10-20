'use client';

import { Moon, Sun } from 'lucide-react';
import { IconButton } from '@design_system';
import { useTheme } from '@providers';

/** Shows the theme you can switch to: a sun in dark mode, a moon in light. */
export function ThemeSwitch({ className }: { className?: string }) {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === 'dark';

	return (
		<IconButton
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
			onClick={toggleTheme}
			className={className}
			icon={
				isDark ? (
					<Sun aria-hidden="true" className="size-5" />
				) : (
					<Moon aria-hidden="true" className="size-5" />
				)
			}
		/>
	);
}
