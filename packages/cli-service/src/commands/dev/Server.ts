import UserConfig, {App} from '../../misc/UserConfig'

/**
 * A dev server host.
 */
export default class Server {
	/**
	 * The exact path of the app.
	 */
	readonly #appExactPath: string

	/**
	 * The config app record.
	 */
	readonly #app: App

	/**
	 * The project config.
	 */
	readonly #config: UserConfig

	/**
	 * If the dev server is running.
	 */
	#running = false

	/**
	 * Create a dev server host.
	 * @param appExactPath The exact path of the app.
	 * @param app The app record.
	 * @param config The project config.
	 */
	public constructor(appExactPath: string, app: App, config: UserConfig) {
		this.#config = config
		this.#app = app
		this.#appExactPath = appExactPath
	}

	/**
	 * Run the development server.
	 * @returns Nothing.
	 */
	public run() {
		if (this.#running) return
	}
}

