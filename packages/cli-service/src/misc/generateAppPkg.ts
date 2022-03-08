import {UserConfig} from '..'
import {App} from './UserConfig'

/**
 * Generate an automatic package file for a client/server/cli application
 * @param config The project config
 * @param app The application to generate the package file for.
 * @param appRootPathExact The root location to the app
 * @returns Nothing.
 */
export default async function generateAppPkg(config: UserConfig, app: App, appRootPathExact: string) {
	const pkg = {
		name: app.name,
		keywords: app.keywords,
		description: app.description,
		version: config.version,

		...( app.type === 'desktop' ? {build: {
			appId: app.id,
			productName: app.displayName,
			copyright: `Copyright © ${new Date().getFullYear()} ${config.author}`,
		}} : {}),
	}

	console.log(pkg)
}
