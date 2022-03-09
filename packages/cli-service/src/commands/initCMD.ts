import {Argv} from 'yargs'
import askCLI from '../misc/askCLI'
import askListCLI from '../misc/askListCLI'

/**
 * The initialization command.
 * @param program The yargs program.
 * @returns {void}
 */
export default function initCMD(program: Argv) {
	program
		.command('init', 'Initialize a new Nexts project', {}, async (argv) => {
			const options = {
				license: ['MIT', 'Apache-2.0', 'GPL-3.0'],
			}

			const answers = {
				author: await askCLI('Project Author'),
				version: await askCLI('Project Version'),
				license: await askListCLI('Project License', options.license),
			}

			const monorepoPkg = {
				workspaces: [
					'packages/*',
					'apps/*',
				],
			}
		})
}

