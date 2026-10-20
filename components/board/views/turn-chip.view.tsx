import { cn } from '@design_system';
import { Piece } from '../game.utils';

interface Props {
	symbol?: Piece;
	label: string;
	className?: string;
}

export function TurnChip({ symbol, label, className }: Props) {
	return (
		<div
			role="status"
			className={cn(
				'inline-flex h-[30px] items-center gap-2 rounded-full border border-line bg-surface px-3.5 font-mono text-xs font-bold tracking-[0.08em] uppercase lg:h-8 lg:px-4',
				className,
			)}>
			<span
				aria-hidden="true"
				className={cn(
					'size-[7px] rounded-full',
					symbol === 'X' ? 'bg-x' : symbol === 'O' ? 'bg-o' : 'bg-muted',
				)}
			/>
			<span
				className={cn(
					symbol === 'X'
						? 'text-x-text'
						: symbol === 'O'
							? 'text-o-text'
							: 'text-muted',
				)}>
				{label}
			</span>
		</div>
	);
}
