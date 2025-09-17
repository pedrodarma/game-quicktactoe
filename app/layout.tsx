import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'material-icons/iconfont/material-icons.css';
import { AppProvider } from '@providers';
import { Chat } from '@components';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'QuickTactoe',
	description: 'Play Tic Tac Toe with friends online. Fast, fun, and free!',
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
				<meta name="theme-color" content="#00ffff" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans h-dvh`}>
				<AppProvider>
					{children}
					{/* chat button */}
					<Chat />
				</AppProvider>
			</body>
		</html>
	);
}
