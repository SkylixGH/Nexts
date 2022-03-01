import {Argv} from 'yargs';
import logger from '@nexts-stack/logger';
import fsSync from 'fs';
import path from 'path';
import crashError from '../misc/crashError';

interface Flags {
	/**
	 * Path to the project to clean
	 */
	path: string;
}

/**
 * The register util for the clean command.
 * @param program The yargs program.
 * @returns Nothing.
 */
export default function cleanCMD(program: Argv<Flags>) {
	program
		.command('clean [path]', 'Clean the project build files', {
			path: {
				type: 'string',
				description: 'The path to the project',
				default: './',
			},
		}, (argv) => {
			if (
				!fsSync.existsSync(path.join(process.cwd(), argv.path, 'build')) ||
				!fsSync.existsSync(path.join(process.cwd(), argv.path, '.nexts')) ||
				!fsSync.lstatSync(path.join(process.cwd(), argv.path)).isDirectory()
			) {
				logger.error('No projects based on NEXTS framework was found, or the project has already been cleaned');
				process.exit(1);
			}

			logger.log('Cleaning project');

			try {
				fsSync.rmSync(path.join(process.cwd(), argv.path, 'build'), {recursive: true});
				fsSync.rmSync(path.join(process.cwd(), argv.path, '.nexts'), {recursive: true});
			} catch (error) {
				logger.error('Failed to clean the project build files');
				crashError(error);

				process.exit(1);
			}

			logger.success('Project build files have been removed');
		});
}
