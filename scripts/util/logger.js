/**
 * Log an info message.
 * @param {string} message Message.
 * @returns {void}
 */
export function info(message) {
	console.log(`[INFO] ${message}`);
}

/**
 * Log an error message.
 * @param {string} message Message.
 * @returns {void}
 */
export function error(message) {
	console.error(`[ERROR] ${message}`);
}
