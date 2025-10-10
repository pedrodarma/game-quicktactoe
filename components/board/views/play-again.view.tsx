import { PrimaryButton } from '@design_system';
import { useAppContext, useGameContext } from '@providers';

export function PlayAgain() {
	const { createGame } = useAppContext();
	const { gameState, cleanState } = useGameContext();

	function _playAgain() {
		const gameMode = gameState.hash?.includes('bot_')
			? 'local_bot'
			: gameState.hash?.includes('pvp_')
			? 'local_pvp'
			: 'online';
		cleanState();
		createGame(gameMode);
	}

	const _style =
		gameState.status === 'finished' ? 'block scale-150' : 'hidden scale-50';

	return (
		<div
			className={`flex flex-col justify-center items-center gap-1 transition-all ${_style}`}>
			<PrimaryButton onClick={_playAgain}>Play Again</PrimaryButton>
		</div>
	);
}
