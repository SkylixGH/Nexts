/**
 * Log some text into the browser console.
 * @param prefix The message prefix.
 * @param tagColor The color of the prefix.
 * @param message The message to convey.
 * @returns {void}
 */
export function logWithTag(prefix: string, tagColor: string, message: string) {
	console.log(`[%c${prefix}%c]: ${message}`, `color: ${tagColor}`, 'color: inherit')
}
