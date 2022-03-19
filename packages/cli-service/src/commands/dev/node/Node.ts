import fsSync from 'fs';
import DevServer from '../DevServer';
import {App, AppNode} from '../../../misc/UserConfig';
import path from 'path';
import logger from '@nexts-stack/logger';
import crashError from '../../../misc/crashError';
import {ChildProcess, spawn} from 'child_process';
import chokidar from 'chokidar';

/**
 * A NodeJS development server.
 */
export default class Node implements DevServer {
	/**
	 * The ESBuilder.
	 */
	#esBuilder?: import('esbuild').BuildResult;

	/**
	 * The app process.
	 */
	#appProcess?: ChildProcess;

	/**
	 * Stop the development server.
	 * @returns {void}
	 */
	public stop() {
		try {
			this.#esBuilder!.stop!();
		} catch {
			//
		}
	}

	/**
	 * Starts the NodeJS development server.
	 * @param appExactPath The exact path to the application.
	 * @param argvPath The relative argv path.
	 * @param appConfig The application configuration.
	 * @returns Promise for when the server is ready.
	 */
	public async startServer(appExactPath: string, argvPath: string, appConfig: App) {
		if (!fsSync.existsSync(path.join(appExactPath, (appConfig as AppNode).main)) || fsSync.lstatSync(path.join(appExactPath, (appConfig as AppNode).main)).isDirectory()) {
			logger.error(`The main file '${appConfig.main}' does not exist in ${appConfig.path} or is invalid.`);
			process.exit(1);
		}

		logger.log('Starting ESBuild server');
		const esbuild = await import(['es', 'build'].join('')) as typeof import('esbuild');

		try {
			const appPkg = JSON.parse(fsSync.readFileSync(path.join(appExactPath, 'package.json'), 'utf8'));

			this.#esBuilder = await esbuild.build({
				entryPoints: [path.join(appExactPath, (appConfig as AppNode).main)],
				outfile: path.join(appExactPath, 'dist', 'main.node.mjs'),
				format: 'esm',
				target: 'ESNext',
				bundle: true,
				watch: {
					onRebuild: () => {
						logger.log('Recompiling your app');
					},
				},
				platform: 'node',
				external: Object.keys(appPkg.dependencies || {}),
			});
		} catch (error) {
			logger.error('Failed tp start ESBuild server');
			crashError(error);

			process.exit(1);
		}

		try {
			const buildChangeWatcher = chokidar.watch([path.join(appExactPath, 'dist'), path.join(appExactPath, 'node_modules')], {
				ignored: /(^|[/\\])\../,
				ignoreInitial: true,
			});

			const startNode = () => {
				this.#appProcess = spawn('node', [path.join(appExactPath, 'dist', 'main.node.mjs'), argvPath], {
					cwd: appExactPath,
					stdio: 'inherit',
				});
			};

			buildChangeWatcher.on('all', () => {
				if (this.#appProcess) {
					this.#appProcess.kill();
				}

				startNode();
			});

			startNode();
		} catch (error) {
			logger.error('Failed to start NodeJS server');
			crashError(error);

			process.exit(1);
		}
	}
}
