'use client';

import { LargeTitle } from '../../@design_system/titles/large.title';
import { MediumTitle } from '../../@design_system/titles/medium.title';
import { SmallTitle } from '../../@design_system/titles/small.title';
import { SmallText } from '../../@design_system/texts/small.text';
import { LargeText } from '../../@design_system/texts/large.text';
import { MediumText } from '../../@design_system/texts/medium.text';
import { PrimaryButton } from '../../@design_system/buttons/primary.button';
import { CircularButton } from '../../@design_system/buttons/circular.button';
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { TextButton } from '../../@design_system/buttons/text.button';
import { OutlineButton } from '../../@design_system/buttons/outline.button';
import { SecondaryButton } from '../../@design_system/buttons/secondary.button';

export default function DesignSystem() {
	return (
		<div className="h-dvh p-8 pb-20 gap-16 sm:p-20">
			{/*  */}
			<main className="flex flex-col gap-[2px] row-start-2 items-start sm:items-start">
				{/*  */}

				<h1>Colors</h1>
				<div className="flex flex-row gap-4 mb-4">
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-red-900"></div>
						<div className="h-5 w-20 min-w-5 bg-red-700"></div>
						<div className="h-5 w-20 min-w-5 bg-red-500"></div>
						<div className="h-5 w-20 min-w-5 bg-red-300"></div>
						<div className="h-5 w-20 min-w-5 bg-red-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-blue-900"></div>
						<div className="h-5 w-20 min-w-5 bg-blue-700"></div>
						<div className="h-5 w-20 min-w-5 bg-blue-500"></div>
						<div className="h-5 w-20 min-w-5 bg-blue-300"></div>
						<div className="h-5 w-20 min-w-5 bg-blue-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-green-900"></div>
						<div className="h-5 w-20 min-w-5 bg-green-700"></div>
						<div className="h-5 w-20 min-w-5 bg-green-500"></div>
						<div className="h-5 w-20 min-w-5 bg-green-300"></div>
						<div className="h-5 w-20 min-w-5 bg-green-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-yellow-900"></div>
						<div className="h-5 w-20 min-w-5 bg-yellow-700"></div>
						<div className="h-5 w-20 min-w-5 bg-yellow-500"></div>
						<div className="h-5 w-20 min-w-5 bg-yellow-300"></div>
						<div className="h-5 w-20 min-w-5 bg-yellow-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-purple-900"></div>
						<div className="h-5 w-20 min-w-5 bg-purple-700"></div>
						<div className="h-5 w-20 min-w-5 bg-purple-500"></div>
						<div className="h-5 w-20 min-w-5 bg-purple-300"></div>
						<div className="h-5 w-20 min-w-5 bg-purple-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-gray-900"></div>
						<div className="h-5 w-20 min-w-5 bg-gray-700"></div>
						<div className="h-5 w-20 min-w-5 bg-gray-500"></div>
						<div className="h-5 w-20 min-w-5 bg-gray-300"></div>
						<div className="h-5 w-20 min-w-5 bg-gray-100"></div>
					</div>
				</div>
				<div className="flex flex-row gap-4 mb-4">
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-orange-900"></div>
						<div className="h-5 w-20 min-w-5 bg-orange-700"></div>
						<div className="h-5 w-20 min-w-5 bg-orange-500"></div>
						<div className="h-5 w-20 min-w-5 bg-orange-300"></div>
						<div className="h-5 w-20 min-w-5 bg-orange-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-cyan-900"></div>
						<div className="h-5 w-20 min-w-5 bg-cyan-700"></div>
						<div className="h-5 w-20 min-w-5 bg-cyan-500"></div>
						<div className="h-5 w-20 min-w-5 bg-cyan-300"></div>
						<div className="h-5 w-20 min-w-5 bg-cyan-100"></div>
					</div>

					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-teal-900"></div>
						<div className="h-5 w-20 min-w-5 bg-teal-700"></div>
						<div className="h-5 w-20 min-w-5 bg-teal-500"></div>
						<div className="h-5 w-20 min-w-5 bg-teal-300"></div>
						<div className="h-5 w-20 min-w-5 bg-teal-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-amber-900"></div>
						<div className="h-5 w-20 min-w-5 bg-amber-700"></div>
						<div className="h-5 w-20 min-w-5 bg-amber-500"></div>
						<div className="h-5 w-20 min-w-5 bg-amber-300"></div>
						<div className="h-5 w-20 min-w-5 bg-amber-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-indigo-900"></div>
						<div className="h-5 w-20 min-w-5 bg-indigo-700"></div>
						<div className="h-5 w-20 min-w-5 bg-indigo-500"></div>
						<div className="h-5 w-20 min-w-5 bg-indigo-300"></div>
						<div className="h-5 w-20 min-w-5 bg-indigo-100"></div>
					</div>
					<div className="flex flex-col ">
						<div className="h-5 w-20 min-w-5 bg-pink-900"></div>
						<div className="h-5 w-20 min-w-5 bg-pink-700"></div>
						<div className="h-5 w-20 min-w-5 bg-pink-500"></div>
						<div className="h-5 w-20 min-w-5 bg-pink-300"></div>
						<div className="h-5 w-20 min-w-5 bg-pink-100"></div>
					</div>
				</div>
				<h1>Typography</h1>
				<LargeTitle>Design System</LargeTitle>
				<MediumTitle>Design System</MediumTitle>
				<SmallTitle>Design System</SmallTitle>

				<LargeText>Design System</LargeText>
				<MediumText>Design System</MediumText>
				<SmallText>Design System</SmallText>

				{/*  */}

				<h1>Buttons</h1>
				<div className="flex flex-row gap-4 mb-4">
					<PrimaryButton onClick={() => {}}>Button</PrimaryButton>
					<SecondaryButton onClick={() => {}}>Button</SecondaryButton>
					<OutlineButton onClick={() => {}}>Button</OutlineButton>
					<TextButton onClick={() => {}}>Button</TextButton>
				</div>
				<div className="flex flex-row gap-4 mb-4">
					<CircularButton icon={faCoffee} onClick={() => {}} />
					<CircularButton showBadge icon={faCoffee} onClick={() => {}} />
					<CircularButton disabled icon={faCoffee} onClick={() => {}} />
					<CircularButton
						disabled
						showBadge
						icon={faCoffee}
						onClick={() => {}}
					/>
				</div>

				{/*  */}

				<h1>Loaders</h1>
				{/* <OrbitProgress size={48} color="#00ffff" />
				<OrbitProgress size={32} color="#00ffff" />
				<OrbitProgress size={16} color="#00ffff" /> */}
			</main>
			{/*  */}
		</div>
	);
}
