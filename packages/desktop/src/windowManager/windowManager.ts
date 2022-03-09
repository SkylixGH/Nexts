import Window, {Settings} from '../window/Window'
import {PartialDeep} from 'type-fest'

/**
 * Create a new window in the app.
 * @param settings The window settings.
 * @returns The new window.
 */
export function create(settings: PartialDeep<Settings>) {
	return new Window(settings)
}
