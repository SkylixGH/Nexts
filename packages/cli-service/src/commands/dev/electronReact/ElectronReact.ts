import path from 'path'
import fsSync from 'fs'
import logger from '@nexts-stack/logger'
import {spawn} from 'child_process'

/**
 * Electron + React dev server.
 */
export default class ElectronReact {
	/**
	 * Load the Electron server.
	 * @param appExactPath The exact path of the app.
	 * @param argvPath The CLI argv path relative to the CWD.
	 * @returns {void}
	 */
	public async loadElectron(appExactPath: string, argvPath: string) {
		const esbuild = await import(['es', 'build'].join(''))
		const electronPath = path.join(process.cwd(), argvPath, 'node_modules', 'electron')
		const electronExePathInfo = path.join(electronPath, 'path.txt')

		if (!fsSync.existsSync(electronPath)) {
			logger.error('ElectronJS is not installed')
			process.exit(1)
		}

		if (fsSync.lstatSync(electronPath).isFile() || !fsSync.existsSync(electronExePathInfo)) {
			logger.error('Your ElectronJS installation seems to be corrupted')
			process.exit(1)
		}

		const electronExePath = path.join(electronPath, 'dist', fsSync.readFileSync(electronExePathInfo, 'utf8'))

		const electronProcess = spawn(electronExePath, ['./'], {
			cwd: appExactPath,
			stdio: ['ipc'],
			env: {
				NEXTS_DEV_RENDERER: 'https://google.com',
				FORCE_COLOR: '1',
			},
		})

		electronProcess.on('message', (message) => {
			console.log(message, message.toString())
		})

		electronProcess.stdout?.on('data', (data) => {
			data.toString().split('\n').forEach((line: string) => {
				if (line.length === 0 || line === '\r') return
				logger.log(`[App] ${line}`)
			})
		})

		electronProcess.stderr?.on('data', (data) => {
			data.toString().split('\n').forEach((line: string) => {
				if (line.length === 0 || line === '\r') return
				logger.error(`[App] ${line}`)
			})
		})
	}
}
