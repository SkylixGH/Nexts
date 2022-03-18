import Window, {Settings} from '../window/Window';
import {DeepPartial} from '@nexts-stack/internal';
import {EventEmitter} from 'events';
import {sendDevServer} from '../internal/api/api';
import {ElectronReactElectronServerCommand} from '@nexts-stack/cli-service';
import TypedEmitter, {EventMap} from 'typed-emitter';

/**
 * Event emitter types.
 */
interface EventTypes extends EventMap {
	/**
	 * Listen for when all the windows are closed.
	 */
	allWindowsClosed(): void;
}

const windowStore = [] as Window[];
const events = new EventEmitter() as TypedEmitter<EventTypes>;
let openWindows = 0;

/**
 * Create a new window in the app.
 * @param settings The window settings.
 * @returns The new window.
 */
export function create(settings: DeepPartial<Settings>) {
	const window = new Window(settings);
	windowStore.push(window);
	openWindows++;

	window.on('close', () => {
		openWindows--;

		if (openWindows === 0) {
			events.emit('allWindowsClosed');
			sendDevServer(ElectronReactElectronServerCommand.STOP);
		}
	});

	return window;
}

export {
	/**
	 * The event emitter.
	 */
	events,
};
