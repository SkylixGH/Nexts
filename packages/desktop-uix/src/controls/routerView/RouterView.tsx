import React, {useEffect} from 'react';
import {useRouter} from '../..';
import styles from './RouterView.module.scss';

/**
 * The properties of the router view.
 */
export interface Props {
	/**
	 * The router engine.
	 */
	router: ReturnType<typeof useRouter>;
}

/**
 * The router view ref.
 */
export interface Ref {
}

const RouterView = React.forwardRef<Ref, Props>((props) => {
	const [currentRouterView, setCurrentRouterView] = React.useState<JSX.Element | JSX.Element[] | null>(props.router.render());
	const [rendering, setRendering] = React.useState(true);

	useEffect(() => {
		setCurrentRouterView(props.router.render());

		const routeChangeListener = () => {
			setRendering(() => false);
			setCurrentRouterView(() => props.router.render());

			setTimeout(() => {
				setRendering(() => true);
			}, 10);
		};

		const error404Listener = () => {
			console.log('404')
		};

		props.router.events.on('change', routeChangeListener);
		props.router.events.on('notFound', error404Listener);

		return () => {
			props.router.events.removeListener('change', routeChangeListener);
			props.router.events.removeListener('notFound', error404Listener);
		};
	});

	return (
		<div className={styles.root}>
			{rendering && <div className={styles.view}>
				{currentRouterView}
			</div>}
		</div>
	);
});

RouterView.displayName = 'RouterView';
export default RouterView;
