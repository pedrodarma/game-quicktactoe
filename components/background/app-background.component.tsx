'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@providers';
import { SquaredBackground } from '../_reactbits';

interface Colors {
	grid: string;
	hover: string;
	vignette: string;
}

function _readColors(): Colors {
	const styles = getComputedStyle(document.documentElement);
	const read = (name: string) => styles.getPropertyValue(name).trim();
	return {
		grid: read('--qt-grid'),
		hover: read('--qt-grid-hover'),
		vignette: read('--qt-vignette'),
	};
}

/** Animated grid behind every page, coloured from the current theme. */
export function AppBackground() {
	const { theme } = useTheme();
	const [colors, setColors] = useState<Colors>();

	useEffect(() => {
		setColors(_readColors());
	}, [theme]);

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 bg-ground">
			{colors && (
				<SquaredBackground
					direction="diagonal"
					speed={0.25}
					squareSize={48}
					borderColor={colors.grid}
					hoverFillColor={colors.hover}
					gradientColor={colors.vignette}
				/>
			)}
		</div>
	);
}
