import {app, Window, windowManager} from '@nexts-stack/desktop';
import http, {Server} from 'http';

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

	let httpRunning = false;
	let server: Server;
	let renderPageData = '<h1>Err</h1>';

	serviceChannel.registerTask('server:set-html', (props) => {
		renderPageData = props.html;
	});

	serviceChannel.registerTask('server:start', () => {
		if (httpRunning) {
			return;
		}

		httpRunning = true;

		server = http.createServer((req, res) => {
			res.writeHead(200, {
				'Content-Type': 'text/plain',
			});

			res.end(renderPageData);
		});

		server.listen(8090);
	});

	serviceChannel.registerTask('server:stop', () => {
		if (!httpRunning) {
			return;
		}

		httpRunning = false;

		server.close();
	});

	serviceChannel.registerTask('server:status', () => {
		return httpRunning;
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
