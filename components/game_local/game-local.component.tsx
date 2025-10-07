import { GameHeader } from '../header';
import { Footer } from '../footer';
import { Board } from '../board';
import { GameProvider } from '@providers';

interface Props {
	hash: string;
	userId: string;
	againstBot: boolean;
}

export function GameLocal({ hash, userId, againstBot }: Props) {
	return (
		<>
			<GameProvider
				key={'provider' + hash}
				hash={hash}
				// userId={userId}
				// isLocal={true}
				// gameMode={againstBot ? 'local_bot' : 'local_pvp'}
			>
				<div className="flex flex-col h-dvh px-8 pb-20 gap-16 sm:p-20 sm:pt-10">
					<GameHeader />
					<main className="flex flex-col grow gap-[32px] row-start-2 items-center justify-center">
						<Board key={'board' + hash} />
					</main>
					<Footer />
				</div>
			</GameProvider>
		</>
	);
}
