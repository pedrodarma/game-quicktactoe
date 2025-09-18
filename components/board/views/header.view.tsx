import { SmallTitle } from '@design_system';

export function BoardHeader() {
	return (
		<div className="flex flex-row justify-between items-center gap-4 w-full max-w-lg mx-auto">
			<div className="flex flex-col items-center">
				<SmallTitle>Player #1</SmallTitle>

				<small>(you)</small>
			</div>
			<span>vs</span>
			<div className="flex flex-col items-center">
				<SmallTitle>Player #2</SmallTitle>

				<small>(opponent)</small>
			</div>
		</div>
	);
}
