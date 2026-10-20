import { cn, Mark } from '@design_system';
import { Piece } from '../game.utils';

export interface PanelPlayer {
	symbol: Piece;
	title: string;
	subtitle?: string;
	active: boolean;
}

interface Props extends PanelPlayer {
	timeLeft: number;
	duration: number;
	/** The bottom panel on phones (your own clock) is drawn larger. */
	emphasis?: 'primary' | 'secondary';
	className?: string;
}

/**
 * A player's clock, chess-clock style: it lights up in the player's colour
 * on their turn and the bar drains with the time left.
 */
export function ClockPanel({
	symbol,
	title,
	subtitle,
	active,
	timeLeft,
	duration,
	emphasis = 'secondary',
	className,
}: Props) {
	const isX = symbol === 'X';
	const seconds = active ? timeLeft : duration;
	const urgent = active && timeLeft <= 2;
	const percent = active ? Math.round((timeLeft / duration) * 100) : 100;
	const primary = emphasis === 'primary';

	return (
		<section
			aria-label={`${title}, player ${symbol}${active ? ', playing now' : ''}`}
			className={cn(
				'flex flex-col border-[1.5px] transition-colors duration-300',
				primary
					? 'gap-3.5 rounded-3xl px-[18px] pt-[18px] pb-5'
					: 'gap-3 rounded-[22px] px-[18px] py-4',
				'@3xl:w-[180px] @3xl:gap-[18px] @3xl:rounded-3xl @3xl:p-[22px] @[56rem]:w-[210px]',
				active
					? isX
						? 'border-x bg-x-tint'
						: 'border-o bg-o-tint'
					: 'border-line bg-surface',
				className,
			)}>
			<div className="flex items-center justify-between gap-3 @3xl:flex-col @3xl:items-start @3xl:gap-[18px]">
				<div className="flex min-w-0 items-center gap-3 @3xl:flex-col @3xl:items-start @3xl:gap-[18px]">
					<div
						className={cn(
							'flex shrink-0 items-center justify-center border border-line bg-ground',
							primary ? 'size-[52px] rounded-2xl' : 'size-11 rounded-[14px]',
							'@3xl:size-14 @3xl:rounded-[18px]',
						)}>
						<Mark
							symbol={symbol}
							strokeWidth={14}
							className={cn(primary ? 'size-7' : 'size-6', '@3xl:size-[30px]')}
						/>
					</div>
					<div className="flex min-w-0 flex-col gap-px">
						<span
							className={cn(
								'font-bold text-ink',
								primary ? 'text-[17px]' : 'text-base',
								'@3xl:text-lg',
							)}>
							{title}
						</span>
						{subtitle && (
							<span
								className={cn(
									'max-w-40 truncate text-xs font-medium @3xl:max-w-full @3xl:text-[13px]',
									active ? 'text-ink-2' : 'text-muted',
								)}>
								{subtitle}
							</span>
						)}
					</div>
				</div>
				<div
					className={cn(
						'font-mono leading-none font-bold tabular-nums',
						primary
							? 'text-[44px] tracking-[-0.05em]'
							: 'text-[30px] tracking-[-0.04em]',
						'@3xl:text-[52px] @3xl:tracking-[-0.05em]',
						urgent
							? 'text-danger'
							: active
								? isX
									? 'text-x'
									: 'text-o'
								: 'text-muted',
					)}>
					{seconds.toFixed(1)}
					<span
						className={cn(
							'ml-0.5',
							primary ? 'text-lg' : 'text-sm',
							'@3xl:text-xl',
						)}>
						s
					</span>
					<span className="sr-only"> left</span>
				</div>
			</div>
			<div
				className={cn(
					'overflow-hidden rounded-full bg-track',
					primary ? 'h-2' : 'h-1.5',
					'@3xl:h-2',
				)}>
				<div
					className={cn(
						'h-full rounded-full transition-[width] duration-100 ease-linear',
						urgent
							? 'bg-danger'
							: active
								? isX
									? 'bg-x'
									: 'bg-o'
								: 'bg-line',
					)}
					style={{ width: `${percent}%` }}
				/>
			</div>
		</section>
	);
}
