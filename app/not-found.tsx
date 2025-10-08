'use client';

import React from 'react';

import styles from './not-found.module.css';
import { FuzzyText } from '@components';
import Link from 'next/link';

export default function NotFound() {
	const hoverIntensity = 0.5;
	const enableHover = true;

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<FuzzyText
					baseIntensity={0.2}
					hoverIntensity={hoverIntensity}
					enableHover={enableHover}>
					404
				</FuzzyText>

				<FuzzyText
					baseIntensity={0.2}
					hoverIntensity={hoverIntensity}
					enableHover={enableHover}>
					not found
				</FuzzyText>

				<div className={styles.ctas}>
					<div>Sorry, the page you are looking for does not exist.</div>
					<Link href="/" className={styles.primary}>
						Go back home
					</Link>
				</div>
			</main>
		</div>
	);
}
