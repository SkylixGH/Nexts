import Window, {Settings} from '../window/Window'
import {DeepPartial} from '@nexts-stack/internal'
import {EventEmitter} from 'events'

const windowStore = [] as Window[]
const emitter = new EventEmitter()
let openWindows = 0

/**
 * Create a new window in the app.
 * @param settings The window settings.
 * @returns The new window.
 */
export function create(settings: DeepPartial<Settings>) {
	const window = new Window(settings)
	windowStore.push(window)
	openWindows++

	window.on('close', () => {
		openWindows--

		if (openWindows === 0) {
			emitter.emit('all-windows-closed')
		}
	})

	return window
}

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
