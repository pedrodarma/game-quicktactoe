import { Boards } from './board.constant';

export const Constants = {
	API: process.env.NEXT_PUBLIC_API || 'https://localhost:3000',
	API_IP: process.env.NEXT_PUBLIC_API_IP || 'https://ipinfo.io/ip',
	API_BROKER: process.env.NEXT_PUBLIC_API_BROKER || 'wss://localhost:3000',

	cleanBoard: Boards.CLEAN,
	winningConditions: Boards.WINNING_CONDITIONS,
};

export default Constants;
