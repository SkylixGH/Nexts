/**
 * Log some text into the browser console.
 * @param prefix The message prefix.
 * @param tagColor The color of the prefix.
 * @param message The message to convey.
 * @returns {void}
 */
export function logWithTag(prefix: string, tagColor: string, message: string) {
	console.log(`[%c${prefix}%c]: ${message}`, `color: ${tagColor}`, 'color: inherit');
}

/**
 * Log an info message.
 * @param message The message to convey.
 * @returns {void}
 */
export function log(message: string) {
	logWithTag('Info', '#999999', message);
}

/**
 * Log a warning message.
 * @param message The message to convey.
 * @returns {void}
 */
export function warning(message: string) {
	logWithTag('Warning', '#FFFF55', message);
}

/**
 * Log an error message.
 * @param message The message to convey.
 * @returns {void}
 */
export function error(message: string) {
	logWithTag('Error', '#FF5555', message);
}

/**
 * Log a success message.
 * @param message The message to convey.
 * @returns {void}
 */
export function success(message: string) {
	logWithTag('Success', '#50FFAB', message);
}
