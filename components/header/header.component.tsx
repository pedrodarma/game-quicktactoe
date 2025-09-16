import { StatusView } from './views/connection-status.view';

export function Header() {
	return (
		<div className="w-full">
			<div className="max-w-lg mx-auto py-4 flex justify-between items-center">
				<h2 className="bold text-2xl">QuickTacToe</h2>

				<div>
					<StatusView />
				</div>
			</div>
		</div>
	);
}
