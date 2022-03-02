import {Argv} from 'yargs';
import logger from '@nexts-stack/logger';
import fsSync from 'fs';
import readConfig from '../misc/readConfig';
import path from 'path';
import crashError from '../misc/crashError';

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
			logger.log(`Moving build files`);

			if (!config.packages || config.packages.length === 0) {
				logger.error('No packages to publish');
				process.exit(1);
			}

			config.packages.forEach((pkg) => {
				const publishBuildLocation = path.join(process.cwd(), argv.path, '.nexts', 'publish', pkg.path);
				let buildCopy = 0;

				const tryNextBuild = () => {
					if (fsSync.existsSync(path.join(process.cwd(), argv.path, '.nexts', 'publish', pkg.path))) {
						buildCopy++;
						tryNextBuild();
					}
				};

				try {
					fsSync.mkdirSync(publishBuildLocation, {
						recursive: true,
					});
				} catch (e) {
					logger.error(`Could not create publish build location`);
					crashError(e);

					process.exit(1);
				}
			});
		});
}
