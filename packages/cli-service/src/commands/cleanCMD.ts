import {Argv} from 'yargs'
import logger from '@nexts-stack/logger'
import fsSync from 'fs'
import path from 'path'
import crashError from '../misc/crashError'

/**
 * The register util for the clean command.
 * @param program The yargs program.
 * @returns Nothing.
 */
export default function cleanCMD(program: Argv) {
	program
		.command('clean [path]', 'Clean the project build files', {
			path: {
				type: 'string',
				description: 'The path to the project',
				default: './',
			},
			force: {
				type: 'boolean',
				description: 'Clean the project anyways',
				default: false,
			},
		}, (argv) => {
			if (
				(!fsSync.existsSync(path.join(process.cwd(), argv.path, 'build')) ||
				!fsSync.existsSync(path.join(process.cwd(), argv.path, '.nexts')) ||
				!fsSync.lstatSync(path.join(process.cwd(), argv.path)).isDirectory()) &&
				!argv.force
			) {
				logger.error('No projects based on NEXTS framework was found, or the project has already been cleaned')
				process.exit(1)
			}

			logger.log('Cleaning project')

			const failedDelete = (error: any) => {
				if (!argv.force) {
					logger.error('Failed to clean the project build files')
					crashError(error)

					process.exit(1)
				}
			}

			try {
				fsSync.rmSync(path.join(process.cwd(), argv.path, '.nexts'), {recursive: true})
			} catch (error) {
				failedDelete(error)
			}

			try {
				fsSync.rmSync(path.join(process.cwd(), argv.path, 'build'), {recursive: true})
			} catch (error) {
				failedDelete(error)
			}

			logger.success('Project build files have been removed')
		})
}
