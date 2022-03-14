import UserConfig, {App} from '../../misc/UserConfig'
import ElectronReact from './electronReact/ElectronReact'

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
	 * The CLI relative argv path.
	 */
	readonly #argvPath: string

	/**
	 * If the dev server is running.
	 */
	#running = false

	/**
	 * Create a dev server host.
	 * @param appExactPath The exact path of the app.
	 * @param app The app record.
	 * @param config The project config.
	 * @param argvPath The CLI relative argv path.
	 */
	public constructor(appExactPath: string, app: App, config: UserConfig, argvPath: string) {
		this.#config = config
		this.#app = app
		this.#appExactPath = appExactPath
		this.#argvPath = argvPath
	}

	/**
	 * Run the development server.
	 * @returns {void}
	 */
	public async run() {
		if (this.#running) return

		if (this.#app.type === 'desktop') {
			const server = new ElectronReact()
			await server.startServer(this.#appExactPath, this.#argvPath, this.#app)
		}

		this.#running = true
	}
}

