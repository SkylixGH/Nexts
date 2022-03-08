import logger from '@nexts-stack/logger'
import {Argv} from 'yargs'
import readConfig from '../misc/readConfig'
import fsSync from 'fs'
import path from 'path'
import generateAppPkg from '../misc/generateAppPkg'

/**
 * The dev command
 * @param program The yargs program
 * @returns Nothing.
 */
export default function devCMD(program: Argv) {
	program
		.command('dev', 'Start a development server for a NEXTS app', {
			name: {
				type: 'string',
				describe: 'The name of the app to start',
				demandOption: true,
			},
			path: {
				type: 'string',
				default: './',
				describe: 'Path to the root of the project',
			},
			config: {
				type: 'string',
				default: '*',
				describe: 'Path to the config file',
			},
		}, async (argv) => {
			logger.log('Checking environment for development')
			const config = await readConfig(argv.path, argv.config)

			logger.log('Fetching app data')

			if (config.apps?.length === 0) {
				logger.error('There are no applications configured to run')
				process.exit(1)
			}

			const matchedApps = config.apps!.filter((app) => app.name === argv.name)

			if (matchedApps.length > 1) {
				logger.error(`There are multiple applications with the name '${argv.name}'`)
				process.exit(1)
			}

			if (matchedApps.length === 0) {
				logger.error(`There is no application with the name '${argv.name}'`)
				process.exit(1)
			}

			const app = matchedApps[0]

			if (!app.path || app.path.length === 0) {
				logger.error(`An invalid path was provided for the app called ${app.name}`)
				process.exit(1)
			}

			if (!fsSync.existsSync(path.join(process.cwd(), argv.path, app.path))) {
				logger.error(`The path '${app.path}' does not exist for the app called ${app.name}`)
				process.exit(1)
			}

			if (fsSync.lstatSync(path.join(process.cwd(), argv.path, app.path)).isFile()) {
				logger.error(`The path '${app.path}' is a file for the app called ${app.name} but expected a directory`)
				process.exit(1)
			}

			await generateAppPkg(config, app, path.join(process.cwd(), argv.path, app.path))
			logger.log('Generating app package')

			
		})
}

