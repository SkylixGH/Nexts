/**
 * A Nexts error thrown by the framework.
 */
export default class NextsError extends Error {
	/**
	 * Create a new Nexts error.
	 * @param name The name of the error.
	 * @param message The message of the error.
	 */
	public constructor(name: string, message: string) {
		super(message)

		this.name = name
		this.message = message
	}
}
