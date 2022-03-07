import {app, windowManager} from '@nexts-stack/desktop-electron'

/**
 * Create the main browser window.
 * @returns Nothing.
 */
function createWindow() {
	const mainWindow = windowManager.new({
		width: 800,
		height: 400,
	})
}

app.on('ready', createWindow)
