import TypedEmitter, {EventMap} from 'typed-emitter';
import {EventEmitter} from 'events';
import {useAppURL} from '../hooks';

/**
 *
 */
interface EventTypes extends EventMap {
	/**
	 * Listen for when the route changes.
	 * @param oldURL The old route URL.
	 * @param newURL The new route URL.
	 */
	change(oldURL: string, newURL: string): void;

	/**
	 * Listen for when the route changes to an invalid route.
	 * @param oldURL The old route URL.
	 * @param newURL The new route URL.
	 */
	404(oldURL: string, newURL: string): void;
}

const events = new EventEmitter() as TypedEmitter<EventTypes>;

/**
 * A hook for managing the app global router.
 * @param appURL The app URL hook.
 * @returns The router manager.
 */
export default function useRouter(appURL: ReturnType<typeof useAppURL>) {
	return {
		events,
		navigate: (url: string) => {
			const oldURL = appURL.urlPathName;

			appURL.updateAppURL(url);
			events.emit('change', oldURL, url);
		},
	};
}
