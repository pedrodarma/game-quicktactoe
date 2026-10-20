'use client';

/**
 * Living catalogue of the Blitz design system.
 *
 * Add `?screen=<name>` to preview a full game screen without a server:
 * waiting, playing, playing-opponent, playing-hurry, result-win,
 * result-lose, result-draw, result-timeout, result-pvp.
 */

import { ReactNode, useSyncExternalStore } from 'react';
import {
	ChatDock,
	ClockPanel,
	GameHeaderView,
	HowToPlay,
	MODE_LABEL,
	outcomeCopy,
	PlayingView,
	ResultView,
	ThemeSwitch,
	TurnChip,
	WaitingView,
	BoardGrid,
	Outcome,
} from '@components';
import {
	Eyebrow,
	IconButton,
	LargeText,
	LargeTitle,
	Logo,
	MediumText,
	MediumTitle,
	OMark,
	PrimaryButton,
	SecondaryButton,
	SmallText,
	StatusPill,
	XMark,
} from '@design_system';
import { BoardCells } from '@models';
import { MessageSquare } from 'lucide-react';

const _midGame = {
	a: ['X', '-', 'O'],
	b: ['-', 'O', '-'],
	c: ['-', '-', 'X'],
};

const _boards: Record<
	string,
	{ board: Record<string, string[]>; line?: BoardCells[]; winner?: 'X' | 'O' }
> = {
	win: {
		board: { a: ['X', 'O', '-'], b: ['-', 'X', 'O'], c: ['-', '-', 'X'] },
		line: ['a0', 'b1', 'c2'],
		winner: 'X',
	},
	lose: {
		board: { a: ['X', 'X', 'O'], b: ['-', 'O', 'X'], c: ['O', '-', '-'] },
		line: ['a2', 'b1', 'c0'],
		winner: 'O',
	},
	draw: {
		board: { a: ['X', 'O', 'X'], b: ['X', 'O', 'O'], c: ['O', 'X', 'X'] },
	},
	timeout: {
		board: { a: ['X', '-', '-'], b: ['-', 'O', '-'], c: ['-', '-', '-'] },
	},
};

const _online = { current: { status: 'Open' } };

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="flex flex-col gap-4">
			<Eyebrow>{title}</Eyebrow>
			<div className="flex flex-wrap items-start gap-4">{children}</div>
		</section>
	);
}

function Swatch({ name, className }: { name: string; className: string }) {
	return (
		<div className="flex w-28 flex-col gap-2">
			<div className={`h-14 rounded-2xl border border-line ${className}`} />
			<span className="font-mono text-[11px] text-muted">{name}</span>
		</div>
	);
}

function ScreenPreview({ screen }: { screen: string }) {
	const me = { symbol: 'X' as const, title: 'You', subtitle: 'Player X' };
	const opponent = { symbol: 'O' as const, title: 'Opponent', subtitle: 'Ana' };

	let content: ReactNode;

	if (screen === 'waiting') {
		content = <WaitingView mode="online" />;
	} else if (screen.startsWith('playing')) {
		const mine = screen !== 'playing-opponent';
		const timeLeft = screen === 'playing-hurry' ? 1.6 : 4.2;
		content = (
			<PlayingView
				me={{ ...me, active: mine }}
				opponent={{ ...opponent, active: !mine }}
				turn={
					mine
						? { symbol: 'X', label: 'Your turn' }
						: { symbol: 'O', label: 'Opponent’s turn' }
				}
				board={_midGame}
				canPlay={mine}
				ghostSymbol={mine ? 'X' : undefined}
				dimmed={!mine}
				timeLeft={timeLeft}
				duration={7}
				onMove={() => {}}
			/>
		);
	} else {
		const key = screen.replace('result-', '');
		const pvp = key === 'pvp';
		const data = _boards[pvp ? 'win' : key] ?? _boards.win;
		const outcome: Outcome = pvp
			? 'x-wins'
			: key === 'lose'
				? 'lose'
				: key === 'draw'
					? 'draw'
					: key === 'timeout'
						? 'timeout'
						: 'win';
		const copy = outcomeCopy(outcome, pvp ? 'pvp' : 'online', data.line);
		content = (
			<ResultView
				outcome={outcome}
				title={copy.title}
				subtitle={copy.subtitle}
				board={data.board}
				winningPositions={data.line}
				winnerSymbol={data.winner}
				players={
					pvp
						? [
								{ symbol: 'X', title: 'Player X' },
								{ symbol: 'O', title: 'Player O' },
							]
						: [me, opponent]
				}
				onPlayAgain={() => {}}
			/>
		);
	}

	return (
		<div className="mx-auto flex min-h-dvh w-full max-w-[1376px] flex-col px-5 pt-5 pb-6 lg:px-8 lg:pb-8">
			<GameHeaderView modeLabel={MODE_LABEL.online} websocketState={_online} />
			<main className="flex flex-1 gap-6 pt-5 lg:pt-6">
				<section
					aria-label="Game"
					className="@container flex min-w-0 flex-1 flex-col lg:rounded-[28px] lg:border lg:border-line lg:bg-surface/60 lg:px-6 lg:py-10">
					{content}
				</section>
				<ChatDock />
			</main>
		</div>
	);
}

const _noSubscribe = () => () => {};

export default function DesignSystem() {
	// Read `?screen=` on the client only (the page is statically exported).
	const search = useSyncExternalStore(
		_noSubscribe,
		() => window.location.search,
		() => '',
	);
	const screen = new URLSearchParams(search).get('screen');

	if (screen) return <ScreenPreview screen={screen} />;

	return (
		<div className="mx-auto flex min-h-dvh w-full max-w-[1376px] flex-col gap-12 px-5 py-8 lg:px-8">
			<header className="flex items-center justify-between gap-4">
				<Logo />
				<ThemeSwitch />
			</header>

			<div className="flex flex-col gap-3">
				<Eyebrow>Blitz design system</Eyebrow>
				<LargeTitle>Design system</LargeTitle>
				<LargeText>
					Tokens and components used across QuickTacToe, in the current theme.
				</LargeText>
			</div>

			<Section title="Colours">
				<Swatch name="ground" className="bg-ground" />
				<Swatch name="surface" className="bg-surface" />
				<Swatch name="surface-2" className="bg-surface-2" />
				<Swatch name="line" className="bg-line" />
				<Swatch name="ink" className="bg-ink" />
				<Swatch name="muted" className="bg-muted" />
				<Swatch name="x" className="bg-x" />
				<Swatch name="x-tint" className="bg-x-tint" />
				<Swatch name="o" className="bg-o" />
				<Swatch name="o-tint" className="bg-o-tint" />
				<Swatch name="danger" className="bg-danger" />
				<Swatch name="online" className="bg-online" />
			</Section>

			<Section title="Type">
				<div className="flex max-w-xl flex-col gap-3">
					<MediumTitle>Medium title</MediumTitle>
					<MediumText>Medium text for descriptions and rules.</MediumText>
					<SmallText>Small text for secondary details.</SmallText>
					<span className="font-mono text-2xl font-bold">4.2s</span>
				</div>
			</Section>

			<Section title="Buttons">
				<PrimaryButton>Primary</PrimaryButton>
				<PrimaryButton size="lg">Primary large</PrimaryButton>
				<SecondaryButton>Secondary</SecondaryButton>
				<PrimaryButton isLoading>Loading</PrimaryButton>
				<IconButton
					aria-label="Chat"
					showBadge
					icon={<MessageSquare aria-hidden="true" className="size-5" />}
				/>
				<ThemeSwitch />
				<HowToPlay />
			</Section>

			<Section title="Pieces and status">
				<XMark className="size-14" />
				<OMark className="size-14" />
				<StatusPill status="Open" />
				<StatusPill status="Connecting" />
				<StatusPill status="Closed" />
				<TurnChip symbol="X" label="Your turn" />
				<TurnChip symbol="O" label="Opponent’s turn" />
			</Section>

			<Section title="Clocks">
				<div className="flex w-full max-w-sm flex-col gap-4">
					<ClockPanel
						symbol="O"
						title="Opponent"
						subtitle="Ana"
						active={false}
						timeLeft={7}
						duration={7}
					/>
					<ClockPanel
						symbol="X"
						title="You"
						subtitle="Player X"
						active
						timeLeft={4.2}
						duration={7}
						emphasis="primary"
					/>
					<ClockPanel
						symbol="X"
						title="You"
						subtitle="Player X"
						active
						timeLeft={1.4}
						duration={7}
						emphasis="primary"
					/>
				</div>
				<div className="@container w-[800px] max-w-full">
					<div className="flex gap-6">
						<ClockPanel
							symbol="X"
							title="You"
							subtitle="Player X"
							active
							timeLeft={4.2}
							duration={7}
						/>
						<ClockPanel
							symbol="O"
							title="Opponent"
							subtitle="Ana"
							active={false}
							timeLeft={7}
							duration={7}
						/>
					</div>
				</div>
			</Section>

			<Section title="Boards">
				<BoardGrid board={_midGame} canPlay ghostSymbol="X" />
				<BoardGrid
					board={_boards.win.board}
					variant="result"
					winningPositions={_boards.win.line}
					winnerSymbol="X"
				/>
			</Section>

			<Section title="Screens">
				<div className="flex flex-wrap gap-3 text-sm font-semibold text-o-text underline">
					{[
						'waiting',
						'playing',
						'playing-opponent',
						'playing-hurry',
						'result-win',
						'result-lose',
						'result-draw',
						'result-timeout',
						'result-pvp',
					].map((name) => (
						<a key={name} href={`?screen=${name}`}>
							{name}
						</a>
					))}
				</div>
			</Section>
		</div>
	);
}
