import {Props as MenuProps} from '../../controls/app/menu/Menu';
import {EventEmitter} from 'events';
import TypedEmitter, {EventMap} from 'typed-emitter';

/**
 * The event emitter types.
 */
export interface EventTypes extends EventMap {
	/**
	 * Listen for when the useMenu is opened.
	 * @param menu The useMenu data.
	 */
	open(menu: Settings): void;
}

/**
 * Menu settings.
 */
export interface Settings {
	/**
	 * The useMenu body content.
	 */
	body: MenuProps['body'];

	/**
	 * The useMenu header.
	 */
	header?: MenuProps['header'];

	/**
	 * The useMenu footer.
	 */
	footer?: MenuProps['footer'];
}

/**
 * Open a context useMenu.
 * @param options The context options.
 * @returns {void}
 */
function open(options: Settings) {
	events.emit('open', options);
}

const events = new EventEmitter() as TypedEmitter<EventTypes>;

/**
 * A React hook for using context menus.
 * @returns The context menu hook.
 */
export default function useMenu() {
	return {
		/**
		 * The event emitter.
		 */
		events,

		/**
		 * Open a context menu..
		 * @param options The context menu options.
		 * @returns {void}
		 */
		open: (options: Settings) => {
			open(options);
		},
	};
}
