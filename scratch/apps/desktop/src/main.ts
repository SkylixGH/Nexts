import {app, windowManager} from '@nexts-stack/desktop'

/**
 * Create the main browser window.
 * @returns {void}
 */
function createWindow() {
	windowManager.create({
		frame: {
			width: 1200,
			height: 600,
		},
	})

	windowManager.create({
		frame: {
			width: 300,
			height: 200,
		},
	})
}

app.on('all-windows-closed', () => {
	console.log('All windows have been closed, stopping app')
	app.exit()
})

app.on('ready', createWindow)
