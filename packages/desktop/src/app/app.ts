import {app} from 'electron'
import {EventEmitter} from 'events'

const emitter = new EventEmitter()
let ready = app.isReady()

app.on('ready', () => {
	if (ready) return
	ready = true

	emitter.emit('ready')
})

/**
 * See if the app is ready.
 * @returns If the app is ready.
 */
export function isReady() {
	return ready
}

/**
 * Listen for when the app is ready.
 * @param event The event name.
 * @param listener The event listener.
 */
export function on(event: 'ready', listener: () => void): void

/**
 * Listen for events.
 * @param event The event name.
 * @param listener The event listener.
 * @returns Nothing.
 */
export function on(event: string, listener: () => void) {
	emitter.on(event, listener)
}

/**
 * Listen for events once.
 * @param event The event name.
 * @param listener The event listener.
 * @returns Nothing.
 */
export function once(event: 'ready', listener: () => void) {
	emitter.once(event, listener)
}

/**
 * Remove an event listener.
 * @param event The event name.
 * @param listener The event listener.
 * @returns Nothing.
 */
export function removeListener(event: 'ready', listener: () => void) {
	emitter.removeListener(event, listener)
}

/**
 * Remove an event listener.
 * @param event The event name.
 * @param listener The event listener.
 * @returns Nothing.
 */
export function addListener(event: string, listener: () => void) {
	emitter.addListener(event, listener)
}
