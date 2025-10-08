import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@providers';
import { Chat } from '@components';

export const metadata: Metadata = {
	title: 'QuickTactoe',
	description: 'Play Tic Tac Toe with friends online. Fast, fun, and free!',
	themeColor: '#00ffff',

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/apple-touch-icon.png"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
				{/* <meta name="theme-color" content="#00ffff" />
				<meta property="og:title" content="QuickTacToe" />
				<meta
					property="og:description"
					content="Play Tic Tac Toe with friends online. Fast, fun, and free!"
				/>
				<meta
					property="og:image"
					content="https://game-quicktactoe.vercel.app/assets/preview.png"
				/>
				<meta
					property="og:url"
					content="https://game-quicktactoe.vercel.app/assets/preview.png"
				/>
				<meta name="twitter:card" content="summary_large_image" /> */}
			</head>
			<body className={` antialiased font-sans h-dvh`}>
				<AppProvider>
					{children}
					{/* chat button */}
					<Chat />
				</AppProvider>
			</body>
		</html>
	);
}
