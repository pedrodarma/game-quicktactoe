'use client';

import { LargeText, PrimaryButton, SecondaryButton } from '@design_system';
import { useAppContext } from '@providers';
import { useRouter } from 'next/navigation';

export function MainMenu() {
	const router = useRouter();
	const { createGame } = useAppContext();

	return (
		<div className="flex flex-col gap-8 items-center">
			<div className="scale-135">
				<PrimaryButton
					onClick={() => {
						createGame('online');
					}}>
					<div className="mx-8 font-semibold scale-105">
						<LargeText>Play Now</LargeText>
					</div>
				</PrimaryButton>
			</div>
			<div className="flex flex-col gap-4 items-center">
				<SecondaryButton
					onClick={() => {
						// router.push('/game/#local_bot');
						createGame('local_bot');
					}}>
					<div className="mx-11 font-semibold">
						<LargeText>Player vs Bot</LargeText>
					</div>
				</SecondaryButton>
				<SecondaryButton
					onClick={() => {
						// router.push('/game/#local_pvp');
						createGame('local_pvp');
					}}>
					<div className="mx-8 font-semibold">
						<LargeText>Player vs Player</LargeText>
					</div>
				</SecondaryButton>
			</div>
		</div>
	);
}
