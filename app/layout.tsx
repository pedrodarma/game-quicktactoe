import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@providers';
import { Chat } from '@components';

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" className={'dark'}>
			<head>
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/apple-touch-icon.png"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
			</head>
			<body
				className={`antialiased font-sans h-dvh transition-all duration-500`}>
				<AppProvider>
					{children}
					<Chat />
				</AppProvider>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	title: 'QuickTactoe',
	description: 'Play Tic Tac Toe with friends online. Fast, fun, and free!',

	icons: {
		icon: '/icons/icon-192x192.png',
		apple: '/icons/apple-touch-icon.png',
	},
	openGraph: {
		title: 'QuickTacToe',
		description: 'Play Tic Tac Toe with friends online. Fast, fun, and free!',
		url: 'https://game-quicktactoe.vercel.app',
		siteName: 'QuickTacToe',
		images: [
			{
				url: 'https://game-quicktactoe.vercel.app/assets/preview.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://game-quicktactoe.vercel.app/assets/preview.png',
				width: 1800,
				height: 1600,
				alt: 'QuickTacToe',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'QuickTacToe',
		description: 'Play Tic Tac Toe with friends online. Fast, fun, and free!',
		images: ['https://game-quicktactoe.vercel.app/assets/preview.png'],
	},
};
