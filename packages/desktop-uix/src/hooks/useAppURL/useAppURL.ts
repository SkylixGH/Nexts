import {useState} from 'react';
import {PartialDeep} from 'type-fest';
import deepmerge from 'deepmerge';
import {EventEmitter} from 'events';
import TypedEmitter, {EventMap} from 'typed-emitter';

/**
 * Settings for the URL manager.
 */
export interface Settings {

}

/**
 * The types for the event emitter.
 */
interface EventTypes extends EventMap {
	/**
	 * Listen for when the URL changes.
	 * @param oldURL The old URL.
	 * @param newURL The new URL.
	 */
	change(oldURL: string, newURL: string): void;
}

/**
 * Update the APP URL internally.
 * @param events The event emitter.
 * @param settings The settings for the URL manager.
 * @param newURL The new URL.
 * @returns {void}
 */
function updateAppURL(events: TypedEmitter<EventTypes>, settings: Settings, newURL: string) {
	window.history.pushState(null, '', newURL);
	events.emit('change', newURL, newURL);
}

/**
 * A React hook for managing the app's URL.
 * @param settings Settings for the URL manager.
 * @returns The React URL manager hook.
 */
export default function useAppURL(settings: PartialDeep<Settings> = {}) {
	const events = new EventEmitter() as TypedEmitter<EventTypes>;
	const [urlPathName, setUrlPathName] = useState(window.location.pathname);
	const defaultSettings: Settings = {};
	const fullSettings = deepmerge<Settings>(defaultSettings, settings);

	return {
		/**
		 * The URL path name.
		 */
		urlPathName,

		/**
		 * The event emitter.
		 */
		events,

		/**
		 * Update the URL.
		 * @param newURL The new URL.
		 * @returns {void}
		 */
		updateAppURL: (newURL: string) => {
			setUrlPathName(newURL);
			updateAppURL(events, fullSettings, newURL);
		},
	};
}
