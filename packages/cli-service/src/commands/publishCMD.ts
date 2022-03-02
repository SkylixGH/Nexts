import {Argv} from 'yargs';
import logger from '@nexts-stack/logger';
import fsSync from 'fs';
import fse from 'fs-extra';
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

			config.packages.forEach(async (pkg) => {
				let publishBuildLocation = path.join(process.cwd(), argv.path, '.nexts', 'publish', pkg.path);
				let buildCopy = 0;

				const tryNextBuild = () => {
					if (fsSync.existsSync(path.join(process.cwd(), argv.path, '.nexts', 'publish', `${pkg.path} - ${buildCopy}`))) {
						buildCopy++;
						tryNextBuild();
					}
				};

				tryNextBuild();
				publishBuildLocation += ` - ${buildCopy}`;

				try {
					fsSync.mkdirSync(publishBuildLocation, {
						recursive: true,
					});
				} catch (error) {
					logger.error(`Could not create publish build location`);
					crashError(error);

					process.exit(1);
				}

				let appPkg = {} as any;
				try {
					appPkg = JSON.parse(fsSync.readFileSync(path.join(process.cwd(), argv.path, pkg.path, 'package.json'), 'utf-8'));
				} catch (error) {
					logger.error(`Failed to read package.json file for the project called ${pkg.name}`);
				}

				try {
					await fse.writeFile(path.join(publishBuildLocation, 'package.json'), JSON.stringify({
						name: `${pkg.org ? `@${pkg.org}/` : ''}${pkg.name}`,
						description: pkg.description,
						version: config.version,
						dependencies: appPkg.dependencies ?? {},
						bin: appPkg.bin ?? {},
						type: 'module',
						types: './' + path.join('types/', pkg.main).replace(/\\/g, '/'),
						exports: {
							import: './dist.module.mjs',
							require: './dist.commonjs.cjs',
						},
					}));
				} catch (error) {
					logger.error('Failed to move package file');
					crashError(error);

					process.exit(1);
				}

				try {
					const commonJS = await fse.readFile(path.join(process.cwd(), argv.path, 'build', pkg.path, 'dist.commonjs.cjs'));
					const moduleJS = await fse.readFile(path.join(process.cwd(), argv.path, 'build', pkg.path, 'dist.esm.mjs'));

					await fse.writeFile(path.join(publishBuildLocation, './dist.commonjs.cjs'), commonJS);
					await fse.writeFile(path.join(publishBuildLocation, './dist.module.mjs'), moduleJS);
				} catch (error) {
					logger.error('Failed to move distribution scripts');
					crashError(error);

					process.exit(1);
				}

				try {
					await fse.move(path.join(process.cwd(), argv.path, 'build', pkg.path, 'types'), path.join(publishBuildLocation, 'types'));
				} catch (error) {
					logger.error('Failed to move type declarations');
					crashError(error);

					process.exit(1);
				}
			});
		});
}
