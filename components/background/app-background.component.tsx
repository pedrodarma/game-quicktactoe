'use client';

import { useTheme } from '@providers';
import { SquaredBackground } from '../_reactbits';

/** Animated grid behind every page, coloured from the current theme. */
export function AppBackground() {
	const { theme } = useTheme();

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 bg-ground">
			{/* Colours are CSS variables, resolved by the canvas on each theme. */}
			<SquaredBackground
				key={theme}
				direction="diagonal"
				speed={0.25}
				squareSize={48}
				borderColor="var(--qt-grid)"
				hoverFillColor="var(--qt-grid-hover)"
				gradientColor="var(--qt-vignette)"
			/>
		</div>
	);
}
