import { MediumTitle } from '@design_system';
import { StatusView } from './views/connection-status.view';

export function Header() {
	return (
		<div className="w-full max-w-lg mx-auto">
			<div className="py-4 flex gap-4 justify-start items-center">
				<MediumTitle>QuickTacToe</MediumTitle>

				<div>
					<StatusView />
				</div>
			</div>
		</div>
	);
}
