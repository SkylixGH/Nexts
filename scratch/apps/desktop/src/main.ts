import {app, windowManager} from '@nexts-stack/desktop'

/**
 * Create the main browser window.
 * @returns {void}
 */
function createWindow() {
	windowManager.create({
		frame: {
			width: 1200,
			height: 800,
		},
	})
}

app.on('ready', createWindow)
