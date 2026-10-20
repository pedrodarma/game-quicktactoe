'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { cn, IconButton } from '@design_system';
import { useChat } from '../chat.provider';

interface Props {
	onClose: () => void;
	/** Focus the message field when the panel appears. */
	autoFocus?: boolean;
	className?: string;
}

export function ChatPanel({ onClose, autoFocus = false, className }: Props) {
	const { messages, myId, nameOf, send } = useChat();
	const [text, setText] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ block: 'end' });
	}, [messages.length]);

	useEffect(() => {
		if (autoFocus) inputRef.current?.focus();
	}, [autoFocus]);

	function _submit(event: FormEvent) {
		event.preventDefault();
		if (text.trim().length === 0) return;
		send(text);
		setText('');
	}

	return (
		<div
			className={cn(
				'flex h-full min-h-0 flex-col overflow-hidden bg-surface',
				className,
			)}>
			<div className="flex items-center justify-between gap-3 border-b border-line py-4 pr-4 pl-5">
				<div className="flex flex-col gap-0.5">
					<h2 className="font-display text-base font-bold text-ink">Chat</h2>
					<span className="flex items-center gap-1.5 text-xs font-medium text-muted">
						<span aria-hidden="true" className="size-1.5 rounded-full bg-online" />
						Everyone online
					</span>
				</div>
				<IconButton
					aria-label="Close chat"
					tone="ground"
					onClick={onClose}
					icon={<X aria-hidden="true" className="size-[18px]" />}
				/>
			</div>

			<div
				role="log"
				aria-live="polite"
				aria-label="Chat messages"
				className="scrollbar-hidden flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto p-5">
				{messages.length === 0 ? (
					<p className="m-auto max-w-[220px] text-center text-sm leading-[1.45] text-muted">
						No messages yet. Say hi to everyone online.
					</p>
				) : (
					<div className="mt-auto flex flex-col gap-3.5">
						{messages.map((message, index) => {
							const text = message.data.message?.toString() ?? '';
							const mine = !!myId && message.from === myId;
							const showName =
								!mine && messages[index - 1]?.from !== message.from;
							const name = nameOf(message.from) ?? 'Player';

							if (mine) {
								return (
									<div key={index} className="flex justify-end">
										<p className="max-w-[240px] rounded-[16px_16px_6px_16px] bg-primary px-3.5 py-2.5 text-sm leading-[1.4] font-semibold break-words text-on-primary">
											<span className="sr-only">You: </span>
											{text}
										</p>
									</div>
								);
							}

							return (
								<div key={index} className="flex items-end gap-2">
									<span
										aria-hidden="true"
										className={cn(
											'flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[13px] font-bold text-ink-2',
											!showName && 'invisible',
										)}>
										{name.charAt(0).toUpperCase()}
									</span>
									<div className="flex min-w-0 flex-col gap-1">
										{showName && (
											<span className="text-xs font-semibold text-muted">
												{name}
											</span>
										)}
										<p className="max-w-[240px] rounded-[16px_16px_16px_6px] border border-line bg-surface-2 px-3.5 py-2.5 text-sm leading-[1.4] break-words text-ink light:bg-ground">
											<span className="sr-only">{name}: </span>
											{text}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				)}
				<div ref={bottomRef} />
			</div>

			<form
				onSubmit={_submit}
				className="flex items-center gap-2.5 border-t border-line px-4 pt-3.5 pb-4">
				<label htmlFor="chat-message" className="sr-only">
					Message
				</label>
				<input
					ref={inputRef}
					id="chat-message"
					type="text"
					autoComplete="off"
					value={text}
					onChange={(event) => setText(event.target.value)}
					placeholder="Type a message…"
					className="h-12 min-w-0 flex-1 rounded-[14px] border border-line bg-ground px-4 text-sm text-ink placeholder:text-muted focus:border-o focus:outline-none"
				/>
				<button
					type="submit"
					aria-label="Send message"
					disabled={text.trim().length === 0}
					className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-[14px] bg-primary text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
					<Send aria-hidden="true" className="size-5" />
				</button>
			</form>
		</div>
	);
}
