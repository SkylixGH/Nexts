import {EventEmitter} from 'events';
import TypedEmitter, {EventMap} from 'typed-emitter';
import {useEffect, useMemo} from 'react';

/**
 * Event emitter types.
 */
interface EventTypes extends EventMap {
	/**
	 * Listen for messages send from the main process.
	 * @param message The message from the main process.
	 */
	message<MessageType extends Object>(message: MessageType): void;
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
	const appWindow = useMemo<ReturnType<typeof import('@electron/remote').getCurrentWindow> | null>(() => window.require ? window.require('@electron/remote').getCurrentWindow() : null, []);
	const ipcRenderer = useMemo<typeof import('electron').ipcRenderer | null>(() => window.require ? window.require('electron').ipcRenderer : null, []);

	useEffect(() => {
		const ipcMainMessageListener = (event: any, message: any) => {
			if (typeof message.channel !== 'string') return;
			if (typeof message.body !== 'object') return;
			if (typeof message.windowID !== 'number') return;

			if (message.channel === name && message.windowID === appWindow?.id) {
				events.emit('message', message.body);
			}
		};

		if (ipcRenderer) {
			ipcRenderer.on('ipc-from-main', ipcMainMessageListener);
		}

		return () => {
			if (ipcRenderer) {
				ipcRenderer.removeListener('ipc-from-main', ipcMainMessageListener);
			}
		};
	});

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
		send<MessageType extends Object>(message: MessageType) {
			if (!appWindow) return;

			send({
				windowID: appWindow.id,
				body: message,
				channel: name,
			});
		},
	};
}
