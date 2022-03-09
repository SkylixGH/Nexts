import Window, {Settings} from '../window/Window'
import {DeepPartial} from '@nexts-stack/internal'

/**
 * Create a new window in the app.
 * @param settings The window settings.
 * @returns The new window.
 */
export function create(settings: DeepPartial<Settings>) {
	return new Window(settings)
}
