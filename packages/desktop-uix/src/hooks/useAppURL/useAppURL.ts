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

const events = new EventEmitter() as TypedEmitter<EventTypes>;

/**
 * Update the APP URL internaly.
 * @param settings The settings for the URL manager.
 * @param newURL The new URL.
 * @returns {void}
 */
function updateAppURL(settings: Settings, newURL: string) {
	window.history.pushState(null, '', newURL);
}

/**
 * A React hook for managing the app's URL.
 * @param settings Settings for the URL manager.
 * @returns The React URL manager hook.
 */
export default function useAppURL(settings: PartialDeep<Settings> = {}) {
	const [urlPathName, setUrlPathName] = useState('/');
	const defaultSettings: Settings = {};
	const fullSettings = deepmerge<Settings>(defaultSettings, settings);

	return {
		urlPathName,
		events,
		updateAppURL: (newURL: string) => {
			setUrlPathName(newURL);
			updateAppURL(fullSettings, newURL);

			events.emit('change', urlPathName, newURL);
		},
	};
}
