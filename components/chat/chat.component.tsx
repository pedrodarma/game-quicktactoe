'use client';

import { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { cn, IconButton } from '@design_system';
import { useChat } from './chat.provider';
import { ChatPanel } from './views/chat-panel.view';

/** Header button that opens the chat, with an unread badge. */
export function ChatButton({ className }: { className?: string }) {
	const { toggleChat, unread, isVisible } = useChat();
	const label =
		unread > 0
			? `Open chat, ${unread} unread message${unread === 1 ? '' : 's'}`
			: isVisible
				? 'Close chat'
				: 'Open chat';

	return (
		<IconButton
			aria-label={label}
			aria-expanded={isVisible}
			onClick={toggleChat}
			showBadge={unread > 0 && !isVisible}
			className={className}
			icon={<MessageSquare aria-hidden="true" className="size-5" />}
		/>
	);
}

/** Slide-over chat used on phones and on pages without the dock. */
export function ChatDrawer() {
	const { isDrawerOpen, closeDrawer, hasDock } = useChat();

	useEffect(() => {
		if (!isDrawerOpen) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closeDrawer();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [isDrawerOpen]);

	return (
		<div
			className={cn(
				'fixed inset-0 z-50',
				!isDrawerOpen && 'pointer-events-none',
				hasDock && 'xl:hidden',
			)}
			inert={!isDrawerOpen}
			aria-hidden={!isDrawerOpen}>
			<button
				type="button"
				tabIndex={-1}
				aria-label="Close chat"
				onClick={closeDrawer}
				className={cn(
					'absolute inset-0 bg-overlay transition-opacity duration-300',
					isDrawerOpen ? 'opacity-100' : 'opacity-0',
				)}
			/>
			<aside
				role="dialog"
				aria-modal="true"
				aria-label="Chat"
				className={cn(
					'absolute top-0 right-0 bottom-0 w-full border-l border-line shadow-[0_0_80px_var(--qt-shadow)] transition-transform duration-300 sm:w-[400px]',
					isDrawerOpen ? 'translate-x-0' : 'translate-x-full',
				)}>
				{isDrawerOpen && <ChatPanel onClose={closeDrawer} autoFocus />}
			</aside>
		</div>
	);
}

/** Chat docked beside the board on wide game screens. */
export function ChatDock({ className }: { className?: string }) {
	const { isDockOpen, setDockOpen } = useChat();

	if (!isDockOpen) return null;

	return (
		<aside
			aria-label="Chat"
			className={cn(
				'hidden overflow-hidden rounded-[28px] border border-line xl:flex xl:w-[320px] xl:shrink-0 xl:flex-col',
				className,
			)}>
			<ChatPanel onClose={() => setDockOpen(false)} />
		</aside>
	);
}
