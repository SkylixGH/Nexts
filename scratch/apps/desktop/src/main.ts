import {app, windowManager} from '@nexts-stack/desktop';

/**
 * Create the main browser window.
 * @returns {void}
 */
function createWindow() {
	const mainWindow = windowManager.create({
		frame: {
			width: 1200,
			height: 600,
		},
	});

	mainWindow.on('ready', () => {
		const helloChannel = mainWindow.channel('hello');

		helloChannel.on('message', (message) => {
			console.log(JSON.stringify(message, null, 4));
		});
	});
}

app.events.on('all-windows-closed', () => {
	console.log('All windows have been closed, stopping app');
	app.exit();
});

app.events.on('ready', createWindow);
