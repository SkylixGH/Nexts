import {app, Window, windowManager} from '@nexts-stack/desktop';

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

	const helloChannel = mainWindow.channel('hello');
	helloChannel.on('message', () => {
		console.log('Message received from renderer');

		helloChannel.send({
			msg: 'Hey Renderer!',
		});
	});

	mainWindow.on('ready', () => {

	});
}

app.events.on('all-windows-closed', () => {
	console.log('All windows have been closed, stopping app');
	app.exit();
});

app.events.on('ready', createWindow);
