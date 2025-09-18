import { MediumTitle } from '@design_system';
import { StatusView } from './views/connection-status.view';
import { useGameContext } from '@providers';
import { GameStatusView } from './views/game-status.view';

export function GameHeader() {
	const { websocketState } = useGameContext();
	return (
		<div className="w-full max-w-lg mx-auto">
			<div className="py-4 flex gap-4 justify-start items-center">
				<MediumTitle>QuickTacToe</MediumTitle>

				<div>
					<StatusView />
					<GameStatusView />
					{websocketState.current.status}
				</div>
			</div>
		</div>
	);
}
