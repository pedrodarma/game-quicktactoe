'use client';

import React, { useEffect, useRef } from 'react';
import styles from './squared-bg.component.module.css';

interface GridOffset {
	x: number;
	y: number;
}

interface Props {
	direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
	speed?: number;
	borderColor?: string;
	squareSize?: number;
	hoverFillColor?: string;
	gradientColor?: string;
}

/**
 * Animated squared grid (based on reactbits "Squares").
 * - Crisp on high-DPI screens.
 * - Hover highlight follows the pointer even when content sits on top.
 * - Draws a single static frame when the user prefers reduced motion.
 */
export const SquaredBackground: React.FC<Props> = ({
	direction = 'diagonal',
	speed = 0.5,
	borderColor = '#999',
	squareSize = 60,
	hoverFillColor = '#222',
	gradientColor = 'rgba(0, 0, 0, 0.5)',
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const requestRef = useRef<number | null>(null);
	const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
	const pointerRef = useRef<GridOffset | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		let width = 0;
		let height = 0;

		const resizeCanvas = () => {
			const dpr = window.devicePixelRatio || 1;
			width = canvas.offsetWidth;
			height = canvas.offsetHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			if (reduceMotion) drawGrid();
		};

		const drawGrid = () => {
			ctx.clearRect(0, 0, width, height);

			const offsetX = gridOffset.current.x % squareSize;
			const offsetY = gridOffset.current.y % squareSize;
			const pointer = pointerRef.current;

			ctx.lineWidth = 1;
			ctx.strokeStyle = borderColor;

			for (let x = -offsetX; x < width + squareSize; x += squareSize) {
				for (let y = -offsetY; y < height + squareSize; y += squareSize) {
					if (
						pointer &&
						pointer.x >= x &&
						pointer.x < x + squareSize &&
						pointer.y >= y &&
						pointer.y < y + squareSize
					) {
						ctx.fillStyle = hoverFillColor;
						ctx.fillRect(x, y, squareSize, squareSize);
					}

					ctx.strokeRect(x + 0.5, y + 0.5, squareSize, squareSize);
				}
			}

			const gradient = ctx.createRadialGradient(
				width / 2,
				height / 2,
				0,
				width / 2,
				height / 2,
				Math.sqrt(width ** 2 + height ** 2) / 2,
			);
			gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
			gradient.addColorStop(1, gradientColor);

			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);
		};

		const updateAnimation = () => {
			const step = Math.max(speed, 0.1);
			const offset = gridOffset.current;

			switch (direction) {
				case 'right':
					offset.x = (offset.x - step + squareSize) % squareSize;
					break;
				case 'left':
					offset.x = (offset.x + step + squareSize) % squareSize;
					break;
				case 'up':
					offset.y = (offset.y + step + squareSize) % squareSize;
					break;
				case 'down':
					offset.y = (offset.y - step + squareSize) % squareSize;
					break;
				case 'diagonal':
					offset.x = (offset.x - step + squareSize) % squareSize;
					offset.y = (offset.y - step + squareSize) % squareSize;
					break;
				default:
					break;
			}

			drawGrid();
			requestRef.current = requestAnimationFrame(updateAnimation);
		};

		const handlePointerMove = (event: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			pointerRef.current = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
			};
			if (reduceMotion) drawGrid();
		};

		const handlePointerLeave = () => {
			pointerRef.current = null;
			if (reduceMotion) drawGrid();
		};

		window.addEventListener('resize', resizeCanvas);
		window.addEventListener('pointermove', handlePointerMove);
		document.addEventListener('pointerleave', handlePointerLeave);
		resizeCanvas();

		if (!reduceMotion) {
			requestRef.current = requestAnimationFrame(updateAnimation);
		}

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			window.removeEventListener('pointermove', handlePointerMove);
			document.removeEventListener('pointerleave', handlePointerLeave);
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
		};
	}, [direction, speed, borderColor, hoverFillColor, gradientColor, squareSize]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className={styles.squares_canvas}></canvas>
	);
};
