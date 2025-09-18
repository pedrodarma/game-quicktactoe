import { LargeText, MediumTitle } from '@design_system';
import { StatusView } from './views/connection-status.view';

export function MainHeader() {
	return (
		<div className="flex flex-col items-start gap-1 w-full max-w-lg mx-auto">
			<div className="max-w-lg flex gap-4 justify-start items-center">
				<MediumTitle>QuickTacToe</MediumTitle>

				<div>
					<StatusView />
				</div>
			</div>
			<LargeText>Play Tic Tac Toe in seconds</LargeText>
		</div>
	);
}
