import {Argv} from 'yargs';
import logger from '@nexts-stack/logger';

interface Flags {

}

/**
 * The register util for the publish command.
 * @param program The yargs program.
 * @returns Nothing.
 */
export default function publishCMD(program: Argv<Flags>) {
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
