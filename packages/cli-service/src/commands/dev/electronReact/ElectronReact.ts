import path from 'path'
import fsSync from 'fs'
import logger from '@nexts-stack/logger'
import {spawn} from 'child_process'
import chokidar from 'chokidar'
import crashError from '../../../misc/crashError'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * Commands from the Electron system interacting with the dev server.
 */
export enum ElectronServerCommand {
	READY
}

/**
 * Electron + React dev server.
 */
export default class ElectronReact {
	/**
	 * Load the Electron server.
	 * @param appExactPath The exact path of the app.
	 * @param argvPath The CLI argv path relative to the CWD.
	 * @returns Promise for when the dev server is ready.
	 */
	public loadElectron(appExactPath: string, argvPath: string) {
		return new Promise<void>(async (resolve) => {
			const esbuild = await import(['es', 'build'].join('')) as typeof import('esbuild')
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

			let appPackage: any
			let esBuilder: import('esbuild').BuildResult

			try {
				appPackage = JSON.parse(fsSync.readFileSync(path.join(appExactPath, 'package.json'), 'utf8'))
			} catch (error) {
				logger.error('Failed to start dev server due to an error while loading the package file')
				crashError(error)

				process.exit(1)
			}

			try {
				esBuilder = await esbuild.build({
					entryPoints: [path.join(appExactPath, 'src', 'main.ts')],
					format: 'cjs',
					outfile: path.join(appExactPath, 'build', 'main.electron.cjs'),
					target: 'ESNext',
					bundle: true,
					external: Object.keys(appPackage.dependencies || {}) as string[],
					logLevel: 'silent',
					watch: {
						onRebuild: () => {
							logger.log('The app will be recompiled')
						},
					},
				})
			} catch (error) {
				logger.error('Failed to start dev server due to an error while building the app')
				crashError(error)

				process.exit(1)
			}

			const vite = await createServer({
				configFile: false,
				root: appExactPath,
				base: './',
				plugins: [react()],
				publicDir: path.join(appExactPath, 'public'),
				server: {
					hmr: {
						host: 'localhost',
						protocol: 'ws',
					},
				},
			})

			const server = await vite.listen()

			const electronExePath = path.join(electronPath, 'dist', fsSync.readFileSync(electronExePathInfo, 'utf8'))
			const buildUpdateWatcher = chokidar.watch([
				path.join(appExactPath, 'build'),
			], {
				ignoreInitial: true,
			})

			let electronProcess: import('child_process').ChildProcess | null = null

			const bootElectron = () => {
				electronProcess = spawn(electronExePath, ['./'], {
					cwd: appExactPath,
					stdio: ['ipc'],
					env: {
						NEXTS_DEV_RENDERER: `http://${(server.httpServer!.address() as any).address}:${(server.httpServer!.address() as any).port}`,
						FORCE_COLOR: '1',
					},
				})

				electronProcess.on('message', (message: string) => {
					let messageRawJSON: {
						type: ElectronServerCommand,
						data: {[key: string]: any},
					}

					try {
						messageRawJSON = JSON.parse(message)
					} catch {
						return
					}

					switch (messageRawJSON.type) {
					case ElectronServerCommand.READY:
						resolve()
						break

					default:
						logger.warn(`Invalid message received from dev, type: ${messageRawJSON.type}`)
						break
					}
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

			bootElectron()

			buildUpdateWatcher.on('all', () => {
				logger.log('The app has been recompiled and will restart')

				electronProcess?.kill()
				electronProcess = null

				bootElectron()
			})
		})
	}
}
