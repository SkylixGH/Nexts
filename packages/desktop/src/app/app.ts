import {app} from 'electron'
import {EventEmitter} from 'events'
import {ElectronReactElectronServerCommand} from '@nexts-stack/cli-service'
import {sendDevServer} from '../internal/api/api'
import * as windowManager from '../windowManager/windowManager'

const emitter = new EventEmitter()
let ready = app.isReady()

windowManager.on('all-windows-closed', () => {
	emitter.emit('all-windows-closed')
})

if (ready) emitter.emit('ready')
else {
	app.once('ready', () => {
		ready = true

		sendDevServer(ElectronReactElectronServerCommand.READY)
		emitter.emit('ready')
	})
}

/**
 * See if the app is ready.
 * @returns If the app is ready.
 */
export function isReady() {
	return ready
}

/**
 * Stop and exit the app.
 * @returns {void}
 */
export function exit() {
	app.exit()
	process.exit()
}

/**
 * Listen for when the app is ready.
 * @param event The event name.
 * @param listener The event listener.
 */
export function on(event: 'ready', listener: () => void): void

/**
 * Listen for when all the windows have been closed.
 * @param event The event name.
 * @param listener The event listener.
 */
export function on(event: 'all-windows-closed', listener: () => void): void

/**
 * Listen for events.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function on(event: string, listener: () => void) {
	emitter.on(event, listener)
}

/**
 * Listen for events once.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function once(event: string, listener: () => void) {
	emitter.once(event, listener)
}

/**
 * Remove an event listener.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function removeListener(event: string, listener: () => void) {
	emitter.removeListener(event, listener)
}

/**
 * Remove an event listener.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function addListener(event: string, listener: () => void) {
	emitter.addListener(event, listener)
}
