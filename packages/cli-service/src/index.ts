#!/usr/bin/env node

import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import compileCMD from './commands/compileCMD'
import cleanCMD from './commands/cleanCMD'
import publishCMD from './commands/publishCMD'
import initCMD from './commands/initCMD'

/**
 * The CLI binary entry point.
 * @returns Nothing.
 */
export default function bin() {
	const program = yargs(hideBin(process.argv))

	program.scriptName('nexts')
	program.version(process.env.npm_package_version || 'Error: Version not found')
	program.help(true).wrap(Math.floor(process.stdout.columns || 100))

	compileCMD(program as any)
	cleanCMD(program as any)
	publishCMD(program as any)
	initCMD(program as any)

	program.parse()
}

bin()
