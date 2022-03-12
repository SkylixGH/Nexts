import {EventEmitter} from 'events'

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
	/**
	 * The theme properties.
	 */
	readonly #theme: ThemeProperties

	/**
	 * Create a new global app theme.
	 * @param theme The theme to use.
	 */
	public constructor(theme: ThemeProperties) {
		super()

		this.#theme = theme
	}

	/**
	 * Load the theme into the browser.
	 * @returns {void}
	 */
	public load() {
		const themeContainer = document.createElement('style')
		themeContainer.className = '__nexts__theme__'

		themeContainer.innerHTML = this.themeToCss()

		if (document.head.getElementsByClassName('__nexts__theme__').length !== 0) {
			document.head.removeChild(document.head.getElementsByClassName('__nexts__theme__')[0])
		}

		document.head.appendChild(themeContainer)
	}

	/**
	 * Convert the theme properties to a css variable declaration.
	 * @returns The CSS string.
	 */
	private themeToCss() {
		let result = ':root {'

		Object.keys(this.#theme).forEach((key) => {
			result += `--${key}: ${this.#theme[key]};`
		})


		return `${result }}`
	}
}

export default Theme
