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
 * Errors for when interacting with the channel.
 */
export enum Errors {
	/**
	 * The task you are trying to register already exists and is registered.
	 */
	TASK_ALREADY_EXITS = 'TASK_ALREADY_EXITS',
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
	 * The registered tasks.
	 */
	readonly #registeredTasks: string[] = [];

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

	/**
	 * Send a message to the renderer.
	 * @param message The message to send.
	 * @returns {void}
	 */
	public send<MessageType extends Object>(message: MessageType) {
		this.#window.writeWebContentsData('ipc-from-main', {
			channel: this.#name,
			body: message,
			windowID: this.#window.id,
		});
	}

	/**
	 * Register a new task for the renderer to use.
	 * @param name The name of the task.
	 * @param handle The task handle.
	 * @returns {void}
	 */
	public registerTask<PropsTypes extends Object, ReturnType>(name: string, handle: (props: PropsTypes) => (ReturnType | Promise<ReturnType>)) {
		if (this.#registeredTasks.includes(name)) {
			throw new Error(Errors.TASK_ALREADY_EXITS);
		}

		this.#registeredTasks.push(name);

		ipcMain.handle(`${name}-:-${this.#name}`, async (event, props) => {
			if (typeof props.windowID !== 'number') return;
			if (typeof props.channel !== 'string') return;
			if (typeof props.body !== 'object') return;

			if (props.windowID !== this.#window.id || props.channel !== this.#name) {
				return;
			}

			try {
				const promiseOrResult = handle(props.body as PropsTypes);

				if (promiseOrResult instanceof Promise) {
					return await promiseOrResult;
				}

				return promiseOrResult;
			} catch (error) {
				return error;
			}
		});
	}
}
