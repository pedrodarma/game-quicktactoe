import { cn, Mark, XMark } from '@design_system';

// A board mid-game: X to move, the bottom-left cell previewed.
const _cells: ('X' | 'O' | 'ghost' | undefined)[] = [
	'X',
	undefined,
	'O',
	undefined,
	'O',
	undefined,
	'ghost',
	undefined,
	'X',
];

/** Decorative tilted board shown on the home page. */
export function BoardPreview({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				'relative flex justify-center lg:min-h-[540px] lg:items-center',
				className,
			)}>
			<div className="flex w-[222px] -rotate-3 flex-col gap-3 rounded-[26px] border border-line bg-surface/90 p-3 shadow-[0_24px_60px_var(--qt-shadow)] lg:w-[min(420px,100%)] lg:gap-3.5 lg:rounded-[32px] lg:p-4 lg:shadow-[0_40px_90px_var(--qt-shadow)]">
				<div className="grid grid-cols-3 gap-1.5 lg:gap-2.5">
					{_cells.map((cell, index) => (
						<div
							key={index}
							className={cn(
								'flex aspect-square items-center justify-center rounded-[15px] lg:rounded-[22px]',
								cell === 'ghost'
									? 'bg-x-tint shadow-[inset_0_0_0_1.5px_var(--qt-x)]'
									: 'bg-surface-2 light:bg-ground',
							)}>
							{cell === 'ghost' ? (
								<XMark className="size-[56%] opacity-40" />
							) : (
								<Mark symbol={cell} className="size-[56%]" />
							)}
						</div>
					))}
				</div>
				<div className="flex items-center gap-2.5 lg:hidden">
					<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line light:bg-surface-2">
						<div className="h-full w-[58%] rounded-full bg-x" />
					</div>
					<span className="font-mono text-xs font-bold text-x-text">4.1s</span>
				</div>
			</div>

			<div className="absolute bottom-[6%] left-[4%] hidden w-[230px] rotate-[2.5deg] flex-col gap-3 rounded-[22px] border-[1.5px] border-x bg-x-tint px-[18px] py-4 shadow-[0_24px_60px_var(--qt-shadow)] lg:flex">
				<div className="flex items-center justify-between gap-2.5">
					<div className="flex items-center gap-2.5">
						<XMark strokeWidth={14} className="size-[22px]" />
						<span className="text-[15px] font-bold text-ink">Your turn</span>
					</div>
					<span className="font-mono text-[26px] leading-none font-bold text-x-text">
						4.1<span className="ml-px text-[13px]">s</span>
					</span>
				</div>
				<div className="h-1.5 overflow-hidden rounded-full bg-track light:bg-surface">
					<div className="h-full w-[58%] rounded-full bg-x" />
				</div>
			</div>
		</div>
	);
}
