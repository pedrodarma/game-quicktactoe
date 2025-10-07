import { GameProvider } from '@providers';
import { GameHeader } from '../header';
import { Board } from '../board';
import { Footer } from '../footer';

interface Props {
	hash: string;
	userId: string;
}

export function GameOnline({ hash, userId }: Props) {
	return (
		<GameProvider hash={hash} userId={userId} isLocal={false} gameMode="online">
			<div className="flex flex-col h-dvh px-8 pb-20 gap-16 sm:p-20 sm:pt-10">
				<GameHeader />
				<main className="flex flex-col grow gap-[32px] row-start-2 items-center justify-center">
					<Board />
				</main>
				<Footer />
			</div>
		</GameProvider>
	);
}
