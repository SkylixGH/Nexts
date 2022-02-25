/**
 * Read the project config
 * @param relativeCWDPath The path to the project root relative to the CWD.
 * @param relativeCWDConfigPath The path to the config relative to the CWD.
 * @returns Nothing.
 */
import path from 'path'
import fs from 'fs/promises'
import fsSync from 'fs'
import logger from '@nexts-stack/logger'
import crashError from './crashError'
import typescript from 'typescript'
import cacheWrite from '../manager/cacheWrite'
import UserConfig from './UserConfig'

/**
 * Read the project config
 * @param relativeCWDPath The path to the project root relative to the CWD.
 * @param relativeCWDConfigPath The path to the config relative to the CWD.
 * @returns Nothing.
 */
export default async function readConfig(relativeCWDPath: string, relativeCWDConfigPath: string) {
	let configFileName = relativeCWDConfigPath

	if (configFileName === '*' && fsSync.existsSync(path.join(relativeCWDPath, 'nexts.config.ts'))) {
		configFileName = 'nexts.config.ts'
	} else if (configFileName === '*' && fsSync.existsSync(path.join(relativeCWDPath, 'nexts.config.js'))) {
		configFileName = 'nexts.config.js'
	} else if (configFileName === '*') {
		logger.error('No nexts.config.js or nexts.config.ts file found')
		process.exit(1)
	}

	const rawConfigPath = path.join(process.cwd(), relativeCWDPath, configFileName)
	let configString: string

	try {
		configString = await fs.readFile(rawConfigPath, 'utf8')
	} catch (error) {
		logger.error(`Failed to load configuration file from '${rawConfigPath}', the following error was produced:`)
		crashError(error)

		process.exit(1)
	}

	let configCached = ''

	if (configFileName.endsWith('.ts')) {
		try {
			configCached = typescript.transpileModule(configString, {
				compilerOptions: {
					target: typescript.ScriptTarget.ESNext,
					module: typescript.ModuleKind.ESNext,
				},
			}).outputText
		} catch (error) {
			logger.error(`Failed to load typescript based configuration from '${rawConfigPath}', the following error was produced:`)
			crashError(error)

			process.exit(1)
		}

		await cacheWrite(relativeCWDPath, './configs/nexts.mjs', configCached)
	} else {
		await cacheWrite(relativeCWDPath, './configs/nexts.js', configString)
	}

	let configModule: any

	try {
		let configModulePath = path.join(process.cwd(), relativeCWDPath, '.nexts/configs/nexts.mjs');

		if (process.platform === 'win32') {
			configModulePath = 'file:///' + configModulePath
		}

		console.log(configModulePath)
		configModule = await import(configModulePath)
	} catch (error) {
		logger.error(`Failed to load configuration from '${rawConfigPath}', the following error was produced:`)
		crashError(error)

		process.exit(1)
	}

	return configModule.default
}
