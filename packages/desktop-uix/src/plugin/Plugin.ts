import {NextsError} from '@nexts-stack/internal'
import * as logger from '../logger/logger'
import type {ChildProcess} from 'child_process'
import {EventEmitter} from 'events'

/**
 * Errors for when interacting with the plugin hosts/clients.
 */
export enum Errors {
	/**
	 * The path to the plugin is invalid.
	 */
	INVALID_PLUGIN_PATH = 'INVALID_PLUGIN_PATH',

	/**
	 * The plugin being initialized has already been initialized.
	 */
	PLUGIN_EXISTS = 'PLUGIN_EXISTS',

	/**
	 * The plugin was already stopped.
	 */
	ALREADY_STOPPED = 'ALREADY_STOPPED',
}

/**
 * Overloads for event emitter.
 */
declare interface Plugin {
	/**
	 * Listen for when the plugin stops.
	 * @param event The event name.
	 * @param listener The listener.
	 */
	on(event: 'stop', listener: () => void): this
}

/**
 * A plugin interaction instance.
 */
class Plugin extends EventEmitter {
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
	#pluginServer: ChildProcess

	/**
	 * Create a new plugin instance.
	 * @param name The name of the plugin.
	 * @param esmDistroPath The path to the plugin.
	 */
	public constructor(name: string, esmDistroPath: string) {
		super()

		this.name = name
		this.#esmDistroPath = esmDistroPath

		const fs = window.require!('fs') as typeof import('fs')
		const childProcess = window.require!('child_process') as typeof import('child_process')
		const path = window.require!('path') as typeof import('path')

		if (!fs.existsSync(esmDistroPath) || fs.statSync(esmDistroPath).isDirectory()) {
			throw new NextsError(Errors.INVALID_PLUGIN_PATH, `Plugin '${name}' does not exist at '${esmDistroPath}'`)
		}

		this.#pluginServer = childProcess.spawn('node', [esmDistroPath], {
			cwd: path.dirname(esmDistroPath),
			stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
			env: {
				NEXTS_PLUGIN_ENV: 'desktop',
			},
		})

		this.#pluginServer.on('exit', () => {
			this.emit('stop')
		})

		this.#pluginServer.stdout?.on('data', (data: Buffer) => {
			data.toString().split('\n').forEach((line: string) => {
				if (line === '') return
				logger.logWithTag('Plugin Info', '#999999', line)
			})
		})

		this.#pluginServer.stderr?.on('data', (data: Buffer) => {
			data.toString().split('\n').forEach((line: string) => {
				if (line === '') return
				logger.logWithTag('Plugin Error', '#FF5555', line)
			})
		})

		this.#pluginServer.on('message', (message) => {
			console.log(message)
		})
	}

	/**
	 * Stop the plugin daemon.
	 * @returns {void}
	 */
	public stop() {
		if (this.#pluginServer.killed) {
			throw new NextsError(Errors.ALREADY_STOPPED, `Plugin '${this.name}' has already been stopped.`)
		}

		this.#pluginServer.kill()
	}
}

export default Plugin
