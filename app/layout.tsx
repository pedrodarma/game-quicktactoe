import type { Metadata } from 'next';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/manrope';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { AppProvider, themeInitScript, ThemeProvider } from '@providers';
import { AppBackground, ChatDrawer, ChatProvider } from '@components';

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/apple-touch-icon.png"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
			</head>
			<body className="min-h-dvh">
				<ThemeProvider>
					<AppProvider>
						<ChatProvider>
							<AppBackground />
							{children}
							<ChatDrawer />
						</ChatProvider>
					</AppProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	title: 'QuickTacToe',
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
