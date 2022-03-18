import {app} from 'electron';
import {EventEmitter} from 'events';
import {ElectronReactElectronServerCommand, ElectronReactElectronServerCommandStatus} from '@nexts-stack/cli-service';
import {sendDevServer} from '../internal/api/api';
import * as windowManager from '../windowManager/windowManager';
import electronDevtoolsInstaller, {REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';
import TypedEmitter, {EventMap} from 'typed-emitter';

/**
 * Event emitter types.
 */
interface EventTypes extends EventMap {
	/**
	 * Listen for when the app is ready.
	 */
	ready(): void;

	/**
	 * Listen for when all windows are closed.
	 */
	allWindowsClosed(): void;
}

const events = new EventEmitter() as TypedEmitter<EventTypes>;
let ready = app.isReady();

windowManager.events.on('allWindowsClosed', () => {
	events.emit('allWindowsClosed');
});

if (ready) events.emit('ready');
else {
	app.once('ready', () => {
		(async () => {
			const requireDownload = !!process.env.UPGRADE_EXTENSIONS;
			const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

			extensions.forEach((extension) => {
				(electronDevtoolsInstaller as any).default(extension, requireDownload);
			});
		})();

		ready = true;

		sendDevServer<ElectronReactElectronServerCommandStatus>(ElectronReactElectronServerCommand.STATUS, {
			status: 'ready',
		});

		events.emit('ready');
	});
}

/**
 * See if the app is ready.
 * @returns If the app is ready.
 */
export function isReady() {
	return ready;
}

/**
 * Restart the NEXTS application.
 * @returns {void}
 */
export function restart() {
	sendDevServer<ElectronReactElectronServerCommandStatus>(ElectronReactElectronServerCommand.STATUS, {
		status: 'restart',
	});

	app.relaunch();
	app.exit(0);
}

/**
 * Stop and exit the app.
 * @returns {void}
 */
export function exit() {
	app.exit();
	process.exit();
}

export {
	events,
};
