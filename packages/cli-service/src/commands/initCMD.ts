import {Argv} from 'yargs';
import askListCLI from '../misc/askListCLI';

/**
 * The initialization command
 * @param program The yargs program
 * @returns Nothing.
 */
export default function initCMD(program: Argv) {
	program
		.command('init', 'Initialize a new NEXTS project', {}, async (argv) => {
			const projectType = await askListCLI('Select a project license', ['MIT', 'Apache-2.0', 'GPL-3.0']);
			console.log(projectType);
		});
}

