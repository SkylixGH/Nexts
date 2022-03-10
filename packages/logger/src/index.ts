import chalk from 'chalk'

/**
 * Log a formatted message.
 * @param prefix The prefix to use.
 * @param message The message to log.
 * @returns {void}
 */
export function formatLog(prefix: string, message: string) {
	console.log(`${chalk.hex('#999')('[')}${prefix}${chalk.hex('#999')(']')}: ${message}`)
}

/**
 * Log a message.
 * @param text The text to log.
 * @returns {void}
 */
export function log(text: string) {
	formatLog(chalk.hex('#999')('Info'), text)
}

/**
 * Log a warning message.
 * @param text The text to log.
 * @returns {void}
 */
export function warn(text: string) {
	formatLog(chalk.hex('#FFFF55')('Warning'), text)
}

/**
 * Log an error message.
 * @param text The text to log.
 * @returns {void}
 */
export function error(text: string) {
	formatLog(chalk.hex('#FF5555')('Error'), text)
}

/**
 * Log a success message.
 * @param text The text to log.
 * @returns {void}
 */
export function success(text: string) {
	formatLog(chalk.hex('#50FFAB')('Success'), text)
}

const logger = {
	log,
	warn,
	error,
	success,
	formatLog,
}

export default logger
