import {Argv} from 'yargs';

interface Flags {

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

		});
}
