import deepmerge from 'deepmerge'
import * as app from '../app/app'
import {DeepPartial, NextsError} from '@nexts-stack/internal'
import {BrowserWindow} from 'electron'
import {EventEmitter} from 'events'
import {sendDevServer} from '../internal/api/api'

/**
 * Errors for the window.
 */
export enum Errors {
	/**
	 * The Nexts app is not yet ready.
	 */
	APP_NOT_READY = 'APP_NOT_READY',
}

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
export default class Window extends EventEmitter {
	/**
	 * The window settings.
	 */
	#settings: Settings

	/**
	 * The window.
	 */
	#browserWindow: BrowserWindow

	/**
	 * If the renderer is ready.
	 */
	#rendererReady = false

	/**
	 * If the window is ready.
	 */
	#windowReady = false

	/**
	 * Create a new window.
	 * @param settings The window settings.
	 */
	public constructor(settings: DeepPartial<Settings>) {
		super()

		this.#settings = deepmerge<Settings, typeof settings>(defaultSettings, settings)

		if (!app.isReady()) {
			throw new NextsError(Errors.APP_NOT_READY, 'The Nexts app is not yet ready.')
		}

		this.#browserWindow = new BrowserWindow({
			width: this.#settings.frame.width,
			height: this.#settings.frame.height,
			minWidth: this.#settings.frame.restrictions.size.minWidth,
			minHeight: this.#settings.frame.restrictions.size.minHeight,
			maxWidth: this.#settings.frame.restrictions.size.maxWidth,
			maxHeight: this.#settings.frame.restrictions.size.maxHeight,
			fullscreen: this.#settings.frame.fullscreen,
			resizable: this.#settings.frame.restrictions.resize,
			show: false,
			webPreferences: {
				nodeIntegration: true,
				webSecurity: false,
				contextIsolation: false,
			},
		})

		const progressiveLogicAction = () => {
			if (!this.#rendererReady || !this.#windowReady) return

			sendDevServer({
				type: 'WINDOW_READY',
				data: {
					id: this.#browserWindow.id,
				},
			})
		}

		this.#browserWindow.once('ready-to-show', () => {
			this.#windowReady = true
			this.#browserWindow.show()

			progressiveLogicAction()
		})

		if (process.env.NEXTS_DEV_RENDERER) {
			this.#browserWindow.loadURL(process.env.NEXTS_DEV_RENDERER).then(() => {
				this.#rendererReady = true
				progressiveLogicAction()
			})
		}
	}
}
