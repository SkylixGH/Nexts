import logger from '@nexts-stack/logger';
import readline from 'readline';

/**
 * Get CLI input from user.
 * @param question The question to ask.
 * @param validator The input validator.
 * @returns The answer.
 */
export default function askCLI(question: string, validator?: (answer: string) => (string | void)) {
	return new Promise<string>((resolve, reject) => {
		const ask = () => {
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});

			rl.question(`> ${question}: `, (answer) => {
				const validated = validator ? validator(answer) : void 0;

				rl.close();

				if (!validated) {
					resolve(answer);
				} else {
					logger.error(validated);
					ask();
				}
			});
		};

		ask();
	});
}
