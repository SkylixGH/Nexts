import {PartialDeep} from 'type-fest'
import deepmerge from 'deepmerge'

/**
 * Window load settings.
 */
export interface Settings {
	/**
	 * The window frame settings.
	 */
	frame: {
		/**
		 * The width of the window by default.
		 */
		width: number;

		/**
		 * The height of the window by default.
		 */
		height: number;

		/**
		 * Whether the window should be in full screen mode.
		 */
		fullscreen: boolean;

		/**
		 * Window restrictions.
		 */
		restrictions: {
			/**
			 * If the window is resizable.
			 */
			resize: boolean;

			/**
			 * If the window can fullscreen.
			 */
			fullscreen: boolean;

			/**
			 * Window size settings.
			 */
			size: {
				/**
				 * The minimum width of the window.
				 */
				maxWidth: number;

				/**
				 * The minimum height of the window.
				 */
				maxHeight: number;

				/**
				 * The minimum width of the window.
				 */
				minWidth: number;

				/**
				 * The minimum height of the window.
				 */
				minHeight: number;
			}
		}
	};
}

const defaultSettings: Settings = {
	frame: {
		width: 800,
		height: 600,
		fullscreen: false,
		restrictions: {
			resize: true,
			fullscreen: true,
			size: {
				maxWidth: Infinity,
				maxHeight: Infinity,
				minWidth: 100,
				minHeight: 250,
			},
		},
	},
}

/**
 * A browser window.
 */
export default class Window {
	/**
	 * The window settings.
	 */
	#settings: Settings

	/**
	 * Create a new window.
	 * @param settings The window settings.
	 */
	public constructor(settings: PartialDeep<Settings>) {
		this.#settings = deepmerge<Settings, typeof settings>(defaultSettings, settings)
	}
}
