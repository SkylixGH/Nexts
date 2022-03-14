const isElectron = typeof window !== 'undefined' && window.process && window.process.type

/**
 * Get the current ElectronJS app window.
 * @returns The ElectronJS app window.
 */
function getCurrentWindow() {
	let appWindow: import('electron').BrowserWindow | null = null

	if (isElectron) {
		appWindow = (window as any).require('@electron/remote').getCurrentWindow()
	}

	return appWindow
}

/**
 * Minimize the current app window.
 * @returns {void}
 */
export function minimize() {
	const window = getCurrentWindow()

	if (window) {
		window.minimize()
	}
}

/**
 * Close the current browser window.
 * @returns {void}
 */
export function close() {
	const window = getCurrentWindow()

	if (window) {
		window.close()
	}
}

/**
 * Restore the window.
 * @returns {void}
 */
export function restore() {
	const window = getCurrentWindow()

	if (window) {
		window.restore()
	}
}

/**
 * Maximize the window.
 * @returns {void}
 */
export function maximize() {
	const window = getCurrentWindow()

	if (window) {
		window.maximize()
	}
}
