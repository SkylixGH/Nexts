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
import semver from 'semver'

/**
 * Read the project config
 * @param relativeCWDPath The path to the project root relative to the CWD.
 * @param relativeCWDConfigPath The path to the config relative to the CWD.
 * @returns A promise containing the config.
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

	const renderConfigError = (message: string) => {
		logger.error(`Failed to load configuration file from '${rawConfigPath}', the following error was produced:`)
		logger.error(message)

		process.exit(1)
	}

	const renderKeyError = (key: string, expected: string) => {

	}

	const missingKeyError = (key: string) => {
		renderConfigError(`Property '${key}' is missing from the config or is undefined`)
	}

	const isEmpty = (value: any) => {
		if (typeof value === 'undefined') return true
	}

	const validateConfigTypes = (config: {
		[index: string]: any
	}) => {
		if (isEmpty(config?.node)) {
			missingKeyError('node')
		} else if (isEmpty(config?.node?.minVersion)) {
			missingKeyError('node.minVersion')
		} else if (isEmpty(config?.node?.maxVersion)) {
			missingKeyError('node.maxVersion')
		}

		if (isEmpty(config?.version)) {
			missingKeyError('config.version')
		}
	}

	try {
		let configModulePath = path.join(process.cwd(), relativeCWDPath, '.nexts/configs/nexts.mjs')
		configModulePath = 'file:///' + configModulePath.replace(/\\/g, '/')

		configModule = await import(configModulePath)
		validateConfigTypes(configModule.default)
	} catch (error) {
		logger.error(`Failed to load configuration from '${rawConfigPath}', the following error was produced:`)
		crashError(error)

		process.exit(1)
	}

	const nodeVersionRanges = {
		min: configModule.default.node.minVersion,
		max: configModule.default.node.maxVersion,
	}

	if (!semver.valid(nodeVersionRanges.min)) {
		renderConfigError(`Invalid node.minVersion: '${nodeVersionRanges.min}'`)
	} else if (!semver.valid(nodeVersionRanges.max)) {
		renderConfigError(`Invalid node.maxVersion: '${nodeVersionRanges.max}'`)
	}

	const rangeMatches = semver.satisfies(process.version, `${nodeVersionRanges.min} - ${nodeVersionRanges.max}`)
	console.log(rangeMatches)

	return configModule.default as UserConfig
}
