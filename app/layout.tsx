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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
				<AppProvider>
					{children}
					{/* chat button */}
					<Chat />
				</AppProvider>
			</body>
		</html>
	);
}
