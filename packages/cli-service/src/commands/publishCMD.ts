import {Argv} from 'yargs';
import logger from '@nexts-stack/logger';
import fsSync from 'fs';
import readConfig from '../misc/readConfig';

interface Flags {
	/**
	 * Path to the project
	 */
	path: string;
}

/**
 * The register util for the publish command.
 * @param program The yargs program.
 * @returns Nothing.
 */
export default function publishCMD(program: Argv<Flags>) {
	program
		.command('publish [path]', 'Publish all packages', {
			config: {
				type: 'string',
				default: '*',
				describe: 'Path to the config file.',
				alias: 'c',
			},
			path: {
				type: 'string',
				default: './',
				describe: 'Path to the project.',
			},
		}, async (argv) => {
			logger.log('Checking environment for publishing packages');

			const config = await readConfig(argv.path, argv.config);

			logger.log('Moving build files');
		});
}
