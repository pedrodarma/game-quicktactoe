'use client';

import { LargeText, PrimaryButton, SecondaryButton } from '@design_system';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

export function MainMenu() {
	const router = useRouter();

	return (
		<div className="flex flex-col gap-4 items-center">
			<PrimaryButton
				onClick={() => {
					router.push('/game');
				}}>
				<div className="mx-8 font-semibold">
					<LargeText>Play</LargeText>
				</div>
			</PrimaryButton>
			<SecondaryButton
				onClick={() => {
					router.push('/game');
				}}>
				<div className="mx-8 font-semibold">
					<LargeText>Play</LargeText>
				</div>
			</SecondaryButton>
		</div>
	);
}
