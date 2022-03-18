import {app, Window, windowManager} from '@nexts-stack/desktop';
import http from 'http';

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
	const serviceChannel = mainWindow.channel('service');

	serviceChannel.registerTask<any, void>('start:http', (props) => {
		return new Promise((resolve) => {
			const server = http.createServer((req, res) => {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('Hello World\n');
			});

			server.listen(props.port, () => {
				resolve();
			});
		});
	});

	/**
	 * Addition params.
	 */
	interface AddParams {
		a: number;
		b: number;
	}

	helloChannel.registerTask<AddParams, number>('add', (args) => {
		console.log(`Add Task: a=${args.a}, b=${args.b}`);

		if (typeof args.a !== 'number' || typeof args.b !== 'number') {
			throw new Error('Invalid params, both a and b must be numbers');
		}

		return args.a + args.b;
	});

	helloChannel.on('message', () => {
		console.log('Message received from renderer');

		helloChannel.send({
			msg: 'Hey Renderer!',
		});
	});

	mainWindow.on('ready', () => {
		console.log('Window ready');
	});
}

app.events.on('all-windows-closed', () => {
	console.log('All windows have been closed, stopping app');
	app.exit();
});

app.events.on('ready', createWindow);
