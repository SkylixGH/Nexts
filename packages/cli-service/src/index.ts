#!/usr/bin/env node

import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import compileCMD from './commands/compileCMD'
import cleanCMD from './commands/cleanCMD'
import publishCMD from './commands/publishCMD'
import initCMD from './commands/initCMD'
import devCMD from './commands/devCMD'
import UserConfig from './misc/UserConfig'
import {ElectronServerCommand as ElectronReactElectronServerCommand} from './commands/dev/electronReact/ElectronReact'
import esm from 'esm'

/**
 * The CLI binary entry point.
 * @returns {void}
 */
function bin() {
	const program = yargs(hideBin(process.argv))

	program.scriptName('nexts')
	program.version(process.env.npm_package_version || 'Error: Version not found')
	program.help(true).wrap(Math.floor(process.stdout.columns || 100))

	compileCMD(program as any)
	cleanCMD(program as any)
	publishCMD(program as any)
	initCMD(program as any)
	devCMD(program as any)

	program.parse()
}

/**
 * Your project configuration object helper that supports TypeScript.
 * @param config The project configuration object.
 * @returns The project configuration object.
 */
export function defineConfig(config: UserConfig) {
	return config
}

export {UserConfig, ElectronReactElectronServerCommand, esm}

bin()
