import {NextsError} from '@nexts-stack/internal'
import * as logger from '../logger/logger'

/**
 * Errors for when interacting with the plugin hosts/clients.
 */
export enum Errors {
	/**
	 * The requested plugin is not installed.
	 */
	PLUGIN_NOT_FOUND = 'PLUGIN_NOT_FOUND',

	/**
	 * The path to the plugin is invalid.
	 */
	INVALID_PLUGIN_PATH = 'INVALID_PLUGIN_PATH',

	/**
	 * The plugin being initialized has already been initialized.
	 */
	PLUGIN_EXISTS = 'PLUGIN_EXISTS',
}

const initializedPlugins = [] as Plugin[]

/**
 * Send a message to a specific plugin.
 * @param pluginName The name of the plugin.
 * @param task The name of the task run on the plugin.
 * @param message The message contents to send to the plugin.
 * @returns Promise for when the message was sent.
 */
export async function send<MessageType extends Object>(pluginName: string, task: string, message: MessageType = {} as any) {
	const plugin = initializedPlugins.find((p) => p.name === pluginName)
}

/**
 * Initialize and load a plugin.
 * @param name Name of the plugin.
 * @param esmDistroPath The path to the plugin.
 * @returns Promise containing the plugin instance.
 */
export async function initialize(name: string, esmDistroPath: string) {
	if (initializedPlugins.find((p) => p.name === name)) {
		throw new NextsError(Errors.PLUGIN_EXISTS, `Plugin '${name}' has already been initialized`)
	}

	const fs = window.require!('fs') as typeof import('fs')

	if (!fs.existsSync(esmDistroPath) || fs.statSync(esmDistroPath).isDirectory()) {
		throw new NextsError(Errors.INVALID_PLUGIN_PATH, `Plugin '${name}' does not exist at '${esmDistroPath}'`)
	}

	const plugin = new Plugin(name, esmDistroPath)
	initializedPlugins.push(plugin)

	return plugin
}


/**
 * A plugin interaction instance.
 */
export default class Plugin {
	/**
	 * The name of the plugin.
	 */
	public readonly name: string

	/**
	 * The path to the plugin.
	 */
	readonly #esmDistroPath: string

	/**
	 * The plugin host process.
	 */
	#pluginServer: typeof import('child_process').ChildProcessWithoutNullStreams

	/**
	 * Create a new plugin instance.
	 * @param name The name of the plugin.
	 * @param esmDistroPath The path to the plugin.
	 */
	public constructor(name: string, esmDistroPath: string) {
		this.name = name
		this.#esmDistroPath = esmDistroPath

		const childProcess = window.require!('child_process') as typeof import('child_process')
		const path = window.require!('path') as typeof import('path')

		this.#pluginServer = childProcess.spawn('node', [esmDistroPath], {
			cwd: path.dirname(esmDistroPath),
			stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
			env: {
				NEXTS_PLUGIN_ENV: 'desktop',
			},
		})

		console.log(this.#pluginServer)

		this.#pluginServer.stdout.on('data', (data: Buffer) => {
			data.toString().split('\n').forEach((line: string) => {
				logger.logWithTag('Plugin Info', '#999999', line)
			})
		})

		this.#pluginServer.stderr.on('data', (data: Buffer) => {
			data.toString().split('\n').forEach((line: string) => {
				logger.logWithTag('Plugin Error', '#FF5555', line)
			})
		})

		this.#pluginServer.on('message', (message) => {
			console.log(message)
		})
	}
}
