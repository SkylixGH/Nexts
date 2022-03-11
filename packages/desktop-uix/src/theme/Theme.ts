import {EventEmitter} from 'events'

/**
 * The overloads for the events.
 */
declare interface Theme {
	/**
	 * Listen for when the theme is loaded.
	 * @param event The event name.
	 * @param listener The event listener.
	 */
	on(event: 'load', listener: () => void): this

	/**
	 * Listen for when the theme changes.
	 * @param event The event name.
	 * @param listener The event listener.
	 */
	on(event: 'update', listener: () => void): this

	/**
	 * Listen for when the theme is unloaded.
	 * @param event The event name.
	 * @param listener The event listener.
	 */
	on(event: 'unload', listener: () => void): this
}

/**
 * A theme manager.
 */
class Theme extends EventEmitter {

}

export default Theme
