import {EventEmitter} from 'events';

/**
 * Extension types for the event emitter.
 */
declare interface Task<MessageType extends Object> {
	/**
	 * Listen for messages on this task.
	 * @param event The event name.
	 * @param listener The event listener.
	 */
	on(event: 'message', listener: (message: MessageType) => void): this
}

/**
 * A plugin channel task instance.
 */
class Task<MessageType extends Object> extends EventEmitter {
	/**
	 * The name of the task.
	 */
	readonly #name: string;

	/**
	 * Create a new plugin task channel.
	 * @param name The name of the task.
	 */
	public constructor(name: string) {
		super();
		this.#name = name;
	}

	/**
	 * Send a message to the plugin host.
	 * @param message The message to send.
	 * @returns {void}
	 */
	public send<SendMessageType extends Object = MessageType>(message: SendMessageType) {
		process.send!({
			type: this.#name,
			message,
		});
	}
}

export default Task;
