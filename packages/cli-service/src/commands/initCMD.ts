import {Argv} from 'yargs';

/**
 * The initialization command
 * @param program The yargs program
 * @returns Nothing.
 */
export default function initCMD(program: Argv) {
	program
		.command('clean [path]', 'Clean the project build files', {
			path: {
				type: 'string',
				description: 'The path to the project',
				default: './',
			},
		}, (argv) => {

		});
}

