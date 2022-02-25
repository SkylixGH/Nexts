import {Argv} from 'yargs'
import logger from '@nexts-stack/logger'
import readConfig from '../misc/readConfig'

/**
 * CLI command flags
 */
interface Flags {
	/**
	 * Path to the config
	 */
	config: string;

	/**
	 * Path to project
	 */
	path: string;
}

/**
 * The compile command.
 * @param program The yargs program.
 * @returns Nothing.
 */
export default function compileCMD(program: Argv<Flags>) {
	program
		.command('compile [path]', 'Compile your project.', {
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
			logger.log('Checking environment for compilation')

			const config = await readConfig(argv.path, argv.config)
		})
}
