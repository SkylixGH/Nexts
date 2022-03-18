import Window from './Window';

/**
 * A messaging channel for communicating between the host window and its child renderer.
 */
export default class Channel {
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
		this.#window = window;
		this.#name = name;
	}
}
