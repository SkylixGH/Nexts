import {App} from '../../misc/UserConfig';

/**
 * A dev server structure.
 */
export default interface DevServer {
	/**
	 * Start the dev server.
	 * @param appExactPath The exact path of the app.
	 * @param argvPath The argv relative path.
	 * @param appConfig The app config.
	 */
	startServer(appExactPath: string, argvPath: string, appConfig: App): Promise<void>;

	/**
	 * Stop the dev server.
	 */
	stop(): void;
}
