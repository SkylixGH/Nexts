import {EventEmitter} from 'events';
import TypedEmitter, {EventMap} from 'typed-emitter';
import * as themeManager from '../../theme/themeManager';
import {useEffect, useState} from 'react';

const isElectron = typeof window !== 'undefined' && window.process && window.process.type;

let currentTheme = themeManager.getCurrentTheme();

const themeLoad = () => {
	const window = getCurrentWindow();

	if (window) {
		window.setBackgroundColor(currentTheme?.theme.layerSolid1 ?? '#000000');
	}
};

if (currentTheme) {
	themeLoad();
}

themeManager.on('change', () => {
	currentTheme = themeManager.getCurrentTheme();
	themeLoad();
});

/**
 * Get the current ElectronJS app window.
 * @returns The ElectronJS app window.
 */
function getCurrentWindow() {
	let appWindow: import('electron').BrowserWindow | null = null;

	if (isElectron) {
		appWindow = (window as any).require('@electron/remote').getCurrentWindow();
	}

	return appWindow;
}

/**
 * Minimize the current app window.
 * @returns {void}
 */
function minimize() {
	const window = getCurrentWindow();

	if (window) {
		window.minimize();
	}
}

/**
 * Close the current browser window.
 * @returns {void}
 */
function close() {
	const window = getCurrentWindow();

	if (window) {
		window.close();
	}
}

/**
 * Restore the window.
 * @returns {void}
 */
function restore() {
	const window = getCurrentWindow();

	if (window) {
		window.restore();
	}
}

/**
 * Maximize the window.
 * @returns {void}
 */
function maximize() {
	const window = getCurrentWindow();

	if (window) {
		window.maximize();
	}
}

/**
 * Get the current window state.
 * @returns The current window state.
 */
function getWindowState() {
	let result: 'fullScreen' | 'maximized' | 'normal' | 'minimized' | null = null;
	const window = getCurrentWindow();

	if (window) {
		if (window.isFullScreen()) {
			result = 'fullScreen';
		} else if (window.isMaximized()) {
			result = 'maximized';
		} else if (window.isMinimized()) {
			result = 'minimized';
		} else {
			result = 'normal';
		}
	}

	return result;
}

/**
 * The event types for the event emitter.
 */
interface EventTypes extends EventMap {
	/**
	 * Listen for when the window is minimized.
	 */
	minimize(): void;

	/**
	 * Listen for when the window is maximized.
	 */
	maximize(): void;

	/**
	 * Listen for when the window is un maximized.
	 */
	unMaximize(): void;

	/**
	 * Listen for when the window is full screened.
	 */
	fullScreen(): void;

	/**
	 * Listen for when the window leaves full screen.
	 */
	unFullScreen(): void;
}


/**
 * The React hook that lets you manipulate the current app window.
 * @returns The React hook.
 */
export default function useAppWindow() {
	const events = new EventEmitter() as TypedEmitter<EventTypes>;
	const window = getCurrentWindow();
	const [currentWindowState, setCurrentWindowState] = useState(getWindowState());

	useEffect(() => {
		const windowEvent = () => {
			setCurrentWindowState(getWindowState());
		};

		const windowMinimizeListener = () => {
			events.emit('minimize');
			windowEvent();
		};

		const windowMaximizeListener = () => {
			events.emit('maximize');
			windowEvent();
		};

		const windowUnMaximizeListener = () => {
			events.emit('unMaximize');
			windowEvent();
		};

		const windowFullscreenListener = () => {
			events.emit('fullScreen');
			windowEvent();
		};

		const windowLeaveFullscreenListener = () => {
			events.emit('unFullScreen');
			windowEvent();
		};

		if (window) {
			window.addListener('minimize', windowMinimizeListener);
			window.addListener('maximize', windowMaximizeListener);
			window.addListener('unmaximize', windowUnMaximizeListener);
			window.addListener('enter-full-screen', windowFullscreenListener);
			window.addListener('leave-full-screen', windowLeaveFullscreenListener);
		}

		return () => {
			if (window) {
				window.removeListener('minimize', windowMinimizeListener);
				window.removeListener('maximize', windowMaximizeListener);
				window.removeListener('unmaximize', windowUnMaximizeListener);
				window.removeListener('enter-full-screen', windowFullscreenListener);
				window.removeListener('leave-full-screen', windowLeaveFullscreenListener);
			}
		};
	});

	return {
		close,
		restore,
		maximize,
		minimize,
		getWindowState,

		/**
		 * The current state of the window.
		 */
		currentWindowState,

		/**
		 * The event emitter.
		 */
		events,
	};
}
