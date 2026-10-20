import { Timer } from 'lucide-react';
import { cn, Eyebrow, LargeText, LargeTitle } from '@design_system';
import { MATCH_DURATION } from '../../board/game.utils';

export function HomeHero({ className }: { className?: string }) {
	return (
		<section className={cn('flex flex-col gap-3 lg:gap-[18px]', className)}>
			<Eyebrow>
				<Timer aria-hidden="true" className="size-4 text-x" />
				<span>{MATCH_DURATION} seconds per match</span>
			</Eyebrow>
			<LargeTitle>
				Tic Tac Toe
				<br />
				in seconds.
			</LargeTitle>
			<LargeText className="max-w-[300px] lg:max-w-[460px]">
				Three in a row wins — but the clock is always running.
				<span className="hidden lg:inline">
					{' '}
					Play someone online, the bot, or a friend next to you.
				</span>
			</LargeText>
		</section>
	);
}
