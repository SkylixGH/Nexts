#!/usr/bin/env node

import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import compileCMD from './commands/compileCMD'
import {spawn} from 'child_process'

/**
 * Restart this CLI process
 * @returns Nothing.
 */
export function restartCLI() {
	process.on('exit', () => {
		spawn(process.argv.shift() ?? '', process.argv, {
			cwd: process.cwd(),
			stdio: 'inherit',
		})
	})

	process.exit(0)
}

/**
 * The CLI binary entry point.
 * @returns Nothing.
 */
export default function bin() {
	const program = yargs(hideBin(process.argv))
	program.scriptName('nexts')

	compileCMD(program as any)

	program.demandCommand()
	program.parse()
}
