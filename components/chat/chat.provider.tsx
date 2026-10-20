'use client';

import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from 'react';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@providers';
import { WebSocketMessage } from '@models';

/** The desktop game page docks the chat beside the board from this width. */
export const CHAT_DOCK_QUERY = '(min-width: 1280px)';

function _subscribeWide(onChange: () => void) {
	const query = window.matchMedia(CHAT_DOCK_QUERY);
	query.addEventListener('change', onChange);
	return () => query.removeEventListener('change', onChange);
}

function _getWide() {
	return window.matchMedia(CHAT_DOCK_QUERY).matches;
}

function _getWideOnServer() {
	return false;
}

interface ChatContextType {
	messages: WebSocketMessage[];
	myId?: string;
	nameOf: (userId: string) => string | undefined;
	send: (text: string) => void;
	unread: number;
	/** True while a chat panel is on screen. */
	isVisible: boolean;
	isDrawerOpen: boolean;
	isDockOpen: boolean;
	/** Whether this page shows the docked chat on wide screens. */
	hasDock: boolean;
	openDrawer: () => void;
	closeDrawer: () => void;
	setDockOpen: (open: boolean) => void;
	/** Toggles the dock on wide game pages, the drawer everywhere else. */
	toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

/**
 * Global chat (everyone connected to the server). Polls the app websocket
 * state and keeps track of unread messages.
 */
export function ChatProvider({ children }: { children: ReactNode }) {
	const { getMessages, sendMessage, websocketState, users } = useAppContext();
	const pathname = usePathname();
	const hasDock = pathname?.startsWith('/game') ?? false;

	const [messages, setMessages] = useState<WebSocketMessage[]>([]);
	const [readCount, setReadCount] = useState(0);
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const [isDockOpen, setDockOpen] = useState(true);
	const [drawerPath, setDrawerPath] = useState(pathname);
	const isWide = useSyncExternalStore(
		_subscribeWide,
		_getWide,
		_getWideOnServer,
	);
	const countRef = useRef(0);

	useEffect(() => {
		const timer = setInterval(() => {
			const all = getMessages().filter((message) => message.type === 'chat');
			if (all.length === countRef.current) return;
			countRef.current = all.length;
			setMessages(all);
		}, 150);
		return () => clearInterval(timer);
	}, []);

	// Close the drawer when navigating to another page.
	if (drawerPath !== pathname) {
		setDrawerPath(pathname);
		setDrawerOpen(false);
	}

	const myId = websocketState.current.userId;
	const isVisible = isDrawerOpen || (hasDock && isWide && isDockOpen);

	// Everything on screen counts as read.
	if (isVisible && readCount !== messages.length) {
		setReadCount(messages.length);
	}

	const unread = messages
		.slice(readCount)
		.filter((message) => message.from !== myId).length;

	const nameOf = useCallback(
		(userId: string) => users.find((user) => user.id === userId)?.username,
		[users],
	);

	const send = useCallback(
		(text: string) => {
			const trimmed = text.trim();
			if (trimmed.length === 0) return;
			sendMessage({ text: trimmed });
		},
		[sendMessage],
	);

	const toggleChat = useCallback(() => {
		const wide = window.matchMedia(CHAT_DOCK_QUERY).matches;
		if (hasDock && wide) {
			setDockOpen((open) => !open);
		} else {
			setDrawerOpen((open) => !open);
		}
	}, [hasDock]);

	return (
		<ChatContext.Provider
			value={{
				messages,
				myId,
				nameOf,
				send,
				unread,
				isVisible,
				isDrawerOpen,
				isDockOpen,
				hasDock,
				openDrawer: () => setDrawerOpen(true),
				closeDrawer: () => setDrawerOpen(false),
				setDockOpen,
				toggleChat,
			}}>
			{children}
		</ChatContext.Provider>
	);
}

export function useChat() {
	const context = useContext(ChatContext);

	if (context === undefined) {
		throw new Error("You must use 'useChat' within a 'ChatProvider'");
	}

	return context;
}
