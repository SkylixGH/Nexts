import {UserConfig} from '..'
import {App} from './UserConfig'
import fsSync from 'fs'
import path from 'path'
import logger from '@nexts-stack/logger'
import crashError from './crashError'
import getTags from '../api/github/getTags'

/**
 * Generate an automatic package file for a client/server/cli application
 * @param config The project config
 * @param app The application to generate the package file for.
 * @param appRootPathExact The root location to the app
 * @returns Nothing.
 */
export default async function generateAppPkg(config: UserConfig, app: App, appRootPathExact: string) {
	const electronTags = await getTags('electron', 'electron')

	const pkg = {
		name: app.name,
		version: config.version,
		...(app.keywords && app.keywords.length > 0 ? {keywords: app.keywords} : {}),
		...(app.description ? {description: app.description} : {}),
		...( app.type === 'desktop' ? {build: {
			appId: app.id,
			productName: app.displayName,
			copyright: `Copyright © ${new Date().getFullYear()} ${config.author}`,
		}} : {}),
		dependencies: {
			'electron': `^${electronTags[0].name}`,
			...(app.dependencies ? app.dependencies : {}),
		},
	}

	try {
		fsSync.writeFileSync(path.join(appRootPathExact, 'package.json'), JSON.stringify(pkg, null, config.formatting?.package?.indent ?? '\t') + '\n')
	} catch (error) {
		logger.error(`Failed to write package.json file for app ${app.name}`)
		crashError(error)

		process.exit(1)
	}
}
