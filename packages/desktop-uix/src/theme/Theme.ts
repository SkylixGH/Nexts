import {EventEmitter} from 'events'

let currentTheme: Theme;

/**
 * Theme variable properties.
 */
export interface Properties {
	[key: string]: string;
}

/**
 * The overloads for the events.
 */
declare interface Theme<ThemeProperties extends Properties> {
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
class Theme<ThemeProperties extends Properties> extends EventEmitter {
	public constructor() {
		
	}
}

export default Theme
