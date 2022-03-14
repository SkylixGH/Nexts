import logger from '@nexts-stack/logger';

/**
 * Crash the CLI and render an error.
 * @param error The error object.
 * @returns {void}
 */
export default function crashError(error: Error | any) {
	error.stack.split('\n').forEach((line: string) => {
		logger.error(line);
	});
}
