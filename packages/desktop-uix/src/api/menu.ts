import {Props as MenuProps} from '../controls/app/menu/Menu';
import {EventEmitter} from 'events';

const emitter = new EventEmitter();

/**
 * Menu settings.
 */
export interface Settings {
	/**
	 * The menu body content
	 */
	body: MenuProps['body'];

	/**
	 * The menu header.
	 */
	header?: MenuProps['header'];

	/**
	 * The menu footer.
	 */
	footer?: MenuProps['footer'];
}

/**
 * Open a context menu.
 * @param options The context options.
 * @returns {void}
 */
export function open(options: Settings) {
	emitter.emit('open', options);
}

/**
 * Listen for when the app is ready.
 * @param event The event name.
 * @param listener The event listener.
 */
export function on(event: 'open', listener: (props: Settings) => void): void;

/**
 * Listen for events.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function on(event: string, listener: any) {
	emitter.on(event, listener);
}

/**
 * Listen for events once.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function once(event: string, listener: CallableFunction) {
	emitter.once(event, listener);
}

/**
 * Remove an event listener.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function removeListener(event: string, listener: CallableFunction) {
	emitter.removeListener(event, listener);
}

/**
 * Remove an event listener.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function addListener(event: string, listener: CallableFunction) {
	emitter.addListener(event, listener);
}
