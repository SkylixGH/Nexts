#!/usr/bin/env node

import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import compileCMD from './commands/compileCMD';

/**
 * The CLI binary entry point.
 * @returns Nothing.
 */
export default function bin() {
	const program = yargs(hideBin(process.argv));
	program.scriptName('nexts');

	compileCMD(program as any);

	program.demandCommand();
	program.parse();
}

bin();
