import path from 'path';
import fsSync from 'fs';
import fs from 'fs-extra';
import logger from '@nexts-stack/logger';
import {spawn} from 'child_process';
import chokidar from 'chokidar';
import crashError from '../../../misc/crashError';
import {createServer} from 'vite';
import react from '@vitejs/plugin-react';
import {App, AppDesktop} from '../../../misc/UserConfig';
import validateElementID from '../../../misc/validateElementID';

/**
 * Commands from the Electron system interacting with the dev server.
 */
export enum ElectronServerCommand {
	/**
	 * A status indication command.
	 */
	STATUS,

	/**
	 * Tell the dev server to stop.
	 */
	STOP
}

/**
 * The application status indicator.
 */
export interface ElectronServerCommandStatus {
	/**
	 * The application status.
	 */
	status: 'ready'
}

/**
 * Electron + React dev server.
 */
export default class ElectronReact {
	/**
	 * The ESBuild server.
	 */
	#esBuilder?: import('esbuild').BuildResult;

	/**
	 * The Vite dev server.
	 */
	#vite?: import('vite').ViteDevServer;

	/**
	 * Stop the development server.
	 * @returns {void}
	 */
	public stop() {
		try {
			if (this.#vite && this.#vite?.httpServer?.listening) {
				this.#vite?.close();
			}

			if (this.#esBuilder && this.#esBuilder.stop) {
				this.#esBuilder.stop();
			}
		} catch {
			//
		}
	}

	/**
	 * Load the Electron server.
	 * @param appExactPath The exact path of the app.
	 * @param argvPath The CLI argv path relative to the CWD.
	 * @param appConfig The app config.
	 * @returns Promise for when the dev server is ready.
	 */
	public startServer(appExactPath: string, argvPath: string, appConfig: App) {
		return new Promise<void>(async (resolve) => {
			const esbuild = await import(['es', 'build'].join('')) as typeof import('esbuild');
			const electronPath = path.join(process.cwd(), argvPath, 'node_modules', 'electron');
			const electronExePathInfo = path.join(electronPath, 'path.txt');

			if (!fsSync.existsSync(electronPath)) {
				logger.error('ElectronJS is not installed');
				process.exit(1);
			}

			if (fsSync.lstatSync(electronPath).isFile() || !fsSync.existsSync(electronExePathInfo)) {
				logger.error('Your ElectronJS installation seems to be corrupted');
				process.exit(1);
			}

			if (typeof appConfig.main === 'string' || !fsSync.existsSync(path.join(process.cwd(), argvPath, appConfig.path, appConfig.main.backend))) {
				logger.error('Your backend main entry location is invalid');
				process.exit(1);
			}

			if (!fsSync.existsSync(path.join(process.cwd(), argvPath, appConfig.path, appConfig.main.frontend))) {
				logger.error('Your frontend main entry location is invalid');
				process.exit(1);
			}

			if (!validateElementID((appConfig as AppDesktop).rootElementID)) {
				logger.error('Your element ID is invalid for your front end root element');
				process.exit(1);
			}

			let appPackage: any;

			try {
				appPackage = JSON.parse(fsSync.readFileSync(path.join(appExactPath, 'package.json'), 'utf8'));
			} catch (error) {
				logger.error('Failed to start dev server due to an error while loading the package file');
				crashError(error);

				process.exit(1);
			}

			try {
				await fs.writeFile(path.join(appExactPath, 'index.html'), `${[
					'<!DOCTYPE html>',
					'<html lang="en">',
					['<h', 'e', 'a', 'd>'].join(''),
					`       <title>${appPackage.name}</title>`,
					'       <meta charset="utf-8">',
					'       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">',
					'   </head>',
					'   <body>',
					`       <div id="${(appConfig as AppDesktop).rootElementID}"></div>`,
					`       <script src="${appConfig.main.frontend}" type="module"></script>`,
					'   </body>',
					'</html>',
				].join('\n') }\n`);

				this.#esBuilder = await esbuild.build({
					entryPoints: [path.join(appExactPath, appConfig.main.backend)],
					format: 'cjs',
					outfile: path.join(appExactPath, 'build', 'main.electron.cjs'),
					target: 'ESNext',
					bundle: true,
					external: Object.keys(appPackage.dependencies || {}) as string[],
					logLevel: 'silent',
					watch: {
						onRebuild: () => {
							logger.log('The app will be recompiled');
						},
					},
				});
			} catch (error) {
				logger.error('Failed to start dev server due to an error while building the app');
				crashError(error);

				process.exit(1);
			}

			this.#vite = await createServer({
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
			});

			await this.#vite.listen();

			const electronExePath = path.join(electronPath, 'dist', fsSync.readFileSync(electronExePathInfo, 'utf8'));
			const buildUpdateWatcher = chokidar.watch([
				path.join(appExactPath, 'build'),
			], {
				ignoreInitial: true,
			});

			let electronProcess: import('child_process').ChildProcess | null = null;

			const bootElectron = () => {
				electronProcess = spawn(electronExePath, ['./'], {
					cwd: appExactPath,
					stdio: ['ipc'],
					env: {
						NEXTS_DEV_RENDERER: `http://${(this.#vite!.httpServer!.address() as any).address}:${(this.#vite!.httpServer!.address() as any).port}`,
						FORCE_COLOR: '1',
					},
				});

				electronProcess.on('message', (message: string) => {
					let messageRawJSON: {
						type: ElectronServerCommand,
						data: {[key: string]: any},
					};

					try {
						messageRawJSON = JSON.parse(message);
					} catch {
						return;
					}

					switch (messageRawJSON.type) {
					case ElectronServerCommand.STATUS:
						const data = messageRawJSON.data as ElectronServerCommandStatus;

						if (data.status === 'ready') {
							resolve();
						}
						break;

					case ElectronServerCommand.STOP:
						logger.log('The application development server for desktop applications is stopping per request by the application');
						this.stop();
						process.exit();
						break;

					default:
						logger.warn(`Invalid message received from dev, type: ${messageRawJSON.type}`);
						break;
					}
				});

				electronProcess.stdout?.on('data', (data) => {
					data.toString().split('\n').forEach((line: string) => {
						if (line.length === 0 || line === '\r') return;
						logger.log(`[App] ${line}`);
					});
				});

				electronProcess.stderr?.on('data', (data) => {
					data.toString().split('\n').forEach((line: string) => {
						if (line.length === 0 || line === '\r') return;
						logger.error(`[App] ${line}`);
					});
				});
			};

			bootElectron();

			buildUpdateWatcher.on('all', () => {
				logger.log('The app has been recompiled and will restart');

				electronProcess?.kill();
				electronProcess = null;

				bootElectron();
			});
		});
	}
}
