import UserConfig from '../misc/UserConfig'
import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'
import logger from '@nexts-stack/logger'

/**
 * Get all the project's apps and packages, and render an error if the requirements aren't met
 * @param relativeCWDPath The path to the project root relative to the CWD.
 * @param config The project's config.
 * @returns Promise containing the apps and packages.
 */
export default async function getAppPackages(relativeCWDPath: string, config: UserConfig) {
	const result = {
		apps: [...config.apps ?? []] as UserConfig['apps'],
		packages: [...config.packages ?? []] as UserConfig['packages'],
	}

	let typescriptInstalled = false

	if (fsSync.existsSync(path.join(process.cwd(), relativeCWDPath, 'node_modules/typescript/bin'))) {
		const tscCorruptError = () => logger.error('TypeScript seems to be installed in your project, but it seems to have been corrupted. Please reinstall it.')

		if (
			!fsSync.existsSync(path.join(process.cwd(), relativeCWDPath, 'node_modules/typescript/bin/tsc')) ||
			fsSync.lstatSync(path.join(process.cwd(), relativeCWDPath, 'node_modules/typescript/bin/tsc')).isDirectory()
		) {
			tscCorruptError()
			process.exit(1)
		}

		const tscFileContents = await fs.readFile(path.join(process.cwd(), relativeCWDPath, 'node_modules/typescript/bin/tsc'), 'utf8')

		if (tscFileContents !== [
			'#!/usr/bin/env node',
			'require(\'../lib/tsc.js\')',
			'',
		].join('\n')) {
			tscCorruptError()
			process.exit(1)
		}

		typescriptInstalled = true
	}

	result.apps?.forEach((app) => {
		if (!fsSync.existsSync(path.join(process.cwd(), relativeCWDPath, app.path))) {
			logger.error(`The app called '${app.name}' doesn't exist at path '${app.path}'`)
			process.exit(1)
		}

		if (fsSync.lstatSync(path.join(process.cwd(), relativeCWDPath, app.path)).isFile()) {
			logger.error(`The app called '${app.name}' leads to a file, but a directory path was expected`)
			process.exit(1)
		}
	})

	result.packages?.forEach((pkg) => {
		if (!fsSync.existsSync(path.join(process.cwd(), relativeCWDPath, pkg.path))) {
			logger.error(`The package called '${pkg.name}' doesn't exist at path '${pkg.path}'`)
			process.exit(1)
		}

		if (!fsSync.existsSync(path.join(process.cwd(), relativeCWDPath, pkg.path, pkg.main))) {
			logger.error(`The package called '${pkg.name}' has a main entry script that doesn't exist at '${path.join(pkg.path, pkg.main)}'`)
			process.exit(1)
		}

		if (fsSync.lstatSync(path.join(process.cwd(), relativeCWDPath, pkg.path)).isFile()) {
			logger.error(`The package called '${pkg.name}' leads to a file, but a directory path was expected`)
			process.exit(1)
		}

		if (fsSync.lstatSync(path.join(process.cwd(), relativeCWDPath, pkg.path, pkg.main)).isDirectory()) {
			logger.error(`The package called '${pkg.name}' has a main entry that leads to a directory, a file path was expected`)
			process.exit(1)
		}

		if (config.typescript && !typescriptInstalled) {
			logger.error('This project uses TypeScript because it was enabled in your config, but TypeScript is not installed')
			process.exit(1)
		}
	})

	return result
}
