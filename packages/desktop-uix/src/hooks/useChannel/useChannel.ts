import {EventEmitter} from 'events';
import TypedEmitter, {EventMap} from 'typed-emitter';

/**
 * Event emitter types.
 */
interface EventTypes extends EventMap {

}

/**
 * Send a message to the main process as a renderer.
 * @param messageFull The full message object/.
 * @returns {void}
 */
function send(messageFull: any) {
	const ipcRenderer: typeof import('electron').ipcRenderer | null = window.require ? window.require('electron').ipcRenderer : null;

	if (ipcRenderer) {
		ipcRenderer.send('ipc-from-renderer', messageFull);
	}
}

/**
 * A React hook for creating a channel to communicate with the main process.
 * @param name The name of the channel.
 * @returns The channel.
 */
export default function useChannel(name: string) {
	const events = new EventEmitter() as TypedEmitter<EventTypes>;
	const appWindow: ReturnType<typeof import('@electron/remote').getCurrentWindow> | null = window.require ? window.require('@electron/remote').getCurrentWindow() : null;

	return {
		/**
		 * The event emitter.
		 */
		events,

		/**
		 * Send a message to the window in the main process.
		 * @param message The message to send.
		 * @returns {void}
		 */
		send: (message: {[key: string]: any}) => {
			if (!appWindow) return;

			send({
				windowID: appWindow.id,
				body: message,
				channel: name,
			});
		},
	};
}
