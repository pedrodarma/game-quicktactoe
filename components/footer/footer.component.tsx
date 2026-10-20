import { ArrowUpRight } from 'lucide-react';
import { cn, GithubIcon } from '@design_system';
import { HowToPlay } from '../how_to_play';
import { GITHUB_URL } from '../header/main-header.component';

/** Phone footer: the desktop header already holds these links. */
export function Footer({ className }: { className?: string }) {
	return (
		<footer
			className={cn('flex items-center justify-between gap-3', className)}>
			<HowToPlay />
			<a
				href={GITHUB_URL}
				target="_blank"
				rel="noopener noreferrer"
				className="flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-ink">
				<GithubIcon />
				<span>GitHub</span>
				<ArrowUpRight aria-hidden="true" className="size-3.5" />
				<span className="sr-only">(opens in a new tab)</span>
			</a>
		</footer>
	);
}
