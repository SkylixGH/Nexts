import {EventEmitter} from 'events';
import * as themeManager from './themeManager';

/**
 * Theme variable properties.
 */
export interface Properties {
	[key: string]: string;

	/**
	 * The type of theme.
	 */
	type: 'light' | 'dark';
}

/**
 * The overloads for the events.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Theme<ThemeProperties extends Properties> {
	/**
	 * Listen for when the theme is loaded.
	 * @param event The event name.
	 * @param listener The event listener.
	 */
	on(event: 'load', listener: () => void): this
}

/**
 * A theme instance.
 */
class Theme<ThemeProperties extends Properties> extends EventEmitter {
	/**
	 * The theme properties.
	 */
	readonly theme: ThemeProperties;

	/**
	 * The type of theme.
	 */
	readonly type: ThemeProperties['type'];

	/**
	 * Create a new global app theme.
	 * @param theme The theme to use.
	 */
	public constructor(theme: ThemeProperties) {
		super();

		this.theme = theme;
		this.type = theme.type;
	}

	/**
	 * Load the theme into the browser.
	 * @returns {void}
	 */
	public load() {
		const themeContainer = document.createElement('style');
		themeContainer.className = '__nexts__theme__';

		themeContainer.innerHTML = this.themeToCss();

		if (document.head.getElementsByClassName('__nexts__theme__').length !== 0) {
			document.head.removeChild(document.head.getElementsByClassName('__nexts__theme__')[0]);
		}

		document.head.appendChild(themeContainer);
		this.emit('load');
		themeManager.setLoadedTheme(this);
	}

	/**
	 * Convert the theme properties to a css variable declaration.
	 * @returns The CSS string.
	 */
	private themeToCss() {
		let result = ':root {';

		Object.keys(this.theme).forEach((key) => {
			result += `--${key}: ${this.theme[key]};`;
		});


		return `${result }}`;
	}
}

export default Theme;
