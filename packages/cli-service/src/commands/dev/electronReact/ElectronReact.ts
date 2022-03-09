import path from 'path'

/**
 * Electron + React dev server.
 */
export default class ElectronReact {
	/**
	 * Load the Electron server.
	 * @param appExactPath The exact path of the app.
	 */
	public async loadElectron(appExactPath: string, argvPath: string) {
		const esbuild = await import(['es', 'build'].join(''))
		const electronPath = path.join(process.cwd(), argvPath, 'node_modules', 'electron')
	}
}
