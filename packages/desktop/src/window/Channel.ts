import Window from './Window';
import TypedEmitter, {EventMap} from 'typed-emitter';
import {EventEmitter} from 'events';
import {ipcMain} from 'electron';

/**
 * Event emitter types.
 */
interface EventTypes extends EventMap {
	/**
	 * Listen for messages on the channel stream.
	 * @param message
	 */
	message<MessageType extends Object>(message: MessageType): void;
}

/**
 * A messaging channel for communicating between the host window and its child renderer.
 */
export default class Channel extends (EventEmitter as unknown as new () => TypedEmitter<EventTypes>) {
	/**
	 * Name of the channel.
	 */
	readonly #name: string;

	/**
	 * The window that owns this channel.
	 */
	readonly #window: Window;

	/**
	 * Creates a new channel.
	 * @param window The window to communicate with.
	 * @param name The name of the channel.
	 */
	public constructor(window: Window, name: string) {
		super();

		this.#window = window;
		this.#name = name;

		ipcMain.on('ipc-from-renderer', (event, message) => {
			if (typeof message.channel !== 'string') return;
			if (typeof message.body !== 'object') return;
			if (typeof message.windowID !== 'number') return;

			if (message.channel === this.#name && message.windowID === this.#window.id) {
				this.emit('message', message.body);
			}
		});
	}
}
