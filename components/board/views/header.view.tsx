import styles from './header.view.module.css';

export function BoardHeader() {
	return (
		<div className="container flex flex-row justify-between items-center gap-4">
			<div className="flex flex-col items-center">
				<h3 className="text-center text-lg">Player #1 </h3>
				{/* <div>(you)</div> */}
			</div>
			<span>vs</span>
			<h3 className="text-center text-lg">Player #2</h3>
		</div>
	);
}
