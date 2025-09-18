import { OrbitProgress } from 'react-loading-indicators';

export function LoadingGame() {
	return (
		<div className="flex flex-col gap-4 items-center">
			<div className="flex items-center scale-100 hover:scale-120 transition-all duration-300">
				<OrbitProgress
					variant="track-disc"
					speedPlus={-4}
					dense
					easing="linear"
					size="large"
				/>
			</div>
			<p>Waiting for opponent...</p>
			{/* <Link href="/game" className="text-blue-600 hover:underline">
				Go to chat
			</Link> */}
		</div>
	);
}
