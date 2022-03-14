import {EventEmitter} from 'events';
import Theme from './Theme';

const emitter = new EventEmitter();
let currentTheme: Theme<any> | null = null;

/**
 * Set the loaded theme so that the theme manager knows more about it.
 * NOTE: This function is automatically called by the theme instance.
 * @param theme The theme to set.
 * @returns {void}
 */
export function setLoadedTheme(theme: Theme<any>) {
	currentTheme = theme;
	emitter.emit('change');
}

/**
 * Get the currently loaded theme.
 * @returns The currently loaded theme.
 */
export function getCurrentTheme() {
	return currentTheme;
}

/**
 * Listen for when the theme changes.
 * @param event The event name.
 * @param listener The event listener.
 */
export function on(event: 'change', listener: () => void): void

/**
 * Listen for events.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function on(event: string, listener: () => void) {
	emitter.on(event, listener);
}

/**
 * Listen for events once.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function once(event: string, listener: () => void) {
	emitter.once(event, listener);
}

/**
 * Remove an event listener.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function removeListener(event: string, listener: () => void) {
	emitter.removeListener(event, listener);
}

/**
 * Remove an event listener.
 * @param event The event name.
 * @param listener The event listener.
 * @returns {void}
 */
export function addListener(event: string, listener: () => void) {
	emitter.addListener(event, listener);
}
