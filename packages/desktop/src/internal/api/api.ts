import {ElectronReactElectronServerCommand} from '@nexts-stack/cli-service';

/**
 * Send a message to the Nexts dev server.
 * @param type The type of action.
 * @param message The message to send.
 * @returns {void}
 */
export function sendDevServer<MessageType extends Object>(type: ElectronReactElectronServerCommand, message: MessageType = {} as any) {
	if (process.send) {
		process.send(JSON.stringify({
			type,
			data: message,
		}));
	}
}
