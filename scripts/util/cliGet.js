import readline from 'readline';
import {error} from './logger.js';

/**
 * Get user input from the CLI.
 * @param {string} question The question to ask the user.
 * @param {CallableFunction} validator A function that validates the user input.
 * @returns {Promise<string>} The user input.
 */
export default function cliGet(question, validator = () => void 0) {
	return new Promise((resolve) => {
		/**
		 * Ask the user input after it has been closed.
		 * @returns {void}
		 */
		function ask() {
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});

			rl.question(`> ${question}: `, (answer) => {
				const validatorResult = validator(answer);

				if (typeof validatorResult === 'string') {
					error(`>> ${ validatorResult}`);
					rl.close();

					ask();
					return;
				}

				rl.close();
				resolve(answer);
			});
		}

		ask();
	});
}
