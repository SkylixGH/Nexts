import {Argv} from 'yargs';
import logger from '@nexts-stack/logger';

/**
 * The compile command.
 * @param program The yargs program.
 * @returns Nothing.
 */
export default function compileCMD(program: Argv) {
	program
		.command('compile [path]', 'Compile your project.', (yargs: Argv) => {
			yargs.positional('path', {
				default: './',
				describe: 'The path to the project.',
				type: 'string',
			});
		}, async (argv: any) => {
			logger.log('Checking environment for compilation');
		});
}
