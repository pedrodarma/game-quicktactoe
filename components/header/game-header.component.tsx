import { MediumTitle } from '@design_system';
import { GameStatusView } from './views/game-status.view';

export function GameHeader() {
	return (
		<div className="w-full max-w-lg mx-auto">
			<div className="py-4 flex gap-4 justify-start items-center">
				<MediumTitle>QuickTacToe</MediumTitle>

				<div>
					<GameStatusView />
				</div>
			</div>
		</div>
	);
}
