export interface WebSocketMessage {
	/**
	 * Type of the message
	 *
	 * log | chat | command | event | action | registered
	 */
	type: WebSocketMessageType;
	from: string;
	to?: string;
	data: Record<string, DataValue>;
}

type WebSocketMessageType =
	| 'log'
	| 'chat'
	| 'command'
	| 'event'
	| 'action'
	| 'registered';

export type DataValue = string | number | boolean | null | undefined | object;
// export type DataValue = Record<string, any>;
