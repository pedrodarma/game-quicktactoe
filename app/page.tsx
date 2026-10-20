'use client';

import {
	BoardPreview,
	Footer,
	HomeHero,
	MainHeader,
	MainMenu,
} from '@components';

export default function Home() {
	return (
		<div className="mx-auto flex min-h-dvh w-full max-w-[1376px] flex-col px-5 pt-5 pb-6 lg:px-8 lg:pb-14">
			<MainHeader />

			<main className="flex flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:content-center lg:gap-x-14 lg:gap-y-7 lg:pt-6">
				<HomeHero className="mt-9 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-end" />
				<BoardPreview className="mt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0" />
				<MainMenu className="mt-auto pt-8 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-start lg:pt-0" />
			</main>

			<Footer className="mt-3 lg:hidden" />
		</div>
	);
}
