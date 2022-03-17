import TypedEmitter, {EventMap} from 'typed-emitter';
import {EventEmitter} from 'events';
import {useAppURL} from '../hooks';
import React, {useEffect, useState} from 'react';
import URLPattern from 'url-pattern';

/**
 * The event types.
 */
interface EventTypes extends EventMap {
	/**
	 * Listen for when the route changes.
	 * @param oldURL The old route URL.
	 * @param newURL The new route URL.
	 */
	change(oldURL: string, newURL: string): void;

	/**
	 * Listen for when a new route is registered.
	 * @param route The route.
	 */
	routeAdded(route: Route): void;

	/**
	 * Listen for when the route changes to an invalid route.
	 * @param oldURL The old route URL.
	 * @param newURL The new route URL.
	 */
	notFound(oldURL: string, newURL: string): void;
}

/**
 * A single route record.
 */
export interface Route {
	/**
	 * The path to the route.
	 */
	path: string;

	/**
	 * The route view component.
	 */
	component: JSX.Element;

	/**
	 * The URL pattern matcher.
	 */
	patternMatcher: URLPattern;
}

/**
 * Navigate to a new route.
 * @param events The event emitter.
 * @param appURL The URL manager hook.
 * @param url The new route URL.
 * @param routes The registered routes.
 * @returns The first matched route if it exists.
 */
function navigate(events: TypedEmitter<EventTypes>, appURL: ReturnType<typeof useAppURL>, url: string, routes: Route[]) {
	const oldURL = appURL.urlPathName;

	const matchedRoutes = routes.filter((route) => route.patternMatcher.match(url));

	if (matchedRoutes.length === 0) {
		events.emit('notFound', oldURL, url);
	}

	appURL.updateAppURL(url);
	events.emit('change', oldURL, url);

	if (matchedRoutes.length > 0) {
		return matchedRoutes[0];
	}

	return null;
}

/**
 * A hook for managing the app global router.
 * @param appURL The app URL hook.
 * @returns The router manager.
 */
export default function useRouter(appURL: ReturnType<typeof useAppURL>) {
	const events = new EventEmitter() as TypedEmitter<EventTypes>;
	const [routes, setRoutes] = useState<Route[]>([]);
	const [currentView, setCurrentView] = useState<JSX.Element | null>(null);
	const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

	return {
		/**
		 * The event emitter.
		 */
		events,

		/**
		 * The current route view.
		 */
		currentView,

		/**
		 * Navigate to a new route.
		 * @param url The new route URL.
		 * @returns {void}
		 */
		navigate: (url: string) => {
			const matched = navigate(events, appURL, url, routes);
			setCurrentView(matched?.component ?? null);
			setCurrentRoute(matched ?? null);
		},

		/**
		 * Add a new route.
		 * @param url The route URL.
		 * @param component The route view component.
		 * @returns {void}
		 */
		addRoute: (url: string, component: JSX.Element) => {
			const route: Route = {
				path: url,
				component,
				patternMatcher: new URLPattern(url),
			};

			setRoutes((routes) => [...routes, route]);
			events.emit('routeAdded', route);

			const matched = navigate(events, appURL, appURL.urlPathName, [route]);
			if (matched) {
				setCurrentView(matched.component);
			}
		},

		/**
		 * Remove a route from the registered routes.
		 * @param url The route URL.
		 * @returns {void}
		 */
		removeRoute: (url: string) => {
			setRoutes((routes) => routes.filter((route) => !route.patternMatcher.match(url)));
		},

		/**
		 * Render the view.
		 * @returns The dynamic view.
		 */
		render() {
			if (currentView) {
				return currentView;
			}

			return React.createElement('div');
		},

		/**
		 * Check if a provided URL matches the current route.
		 * @param url The match URL.
		 * @returns If the URL matches the current route.
		 */
		matches: (url: string) => {
			const [matched, setMatched] = useState<boolean>(false);

			const calculate = () => {
				setMatched(!!currentRoute?.patternMatcher.match(url));
			};

			useEffect(() => {
				calculate();

				const changeListener = () => {
					calculate();
				};

				events.on('change', changeListener);

				return () => {
					events.off('change', changeListener);
				};
			});

			return matched;
		},
	};
}
