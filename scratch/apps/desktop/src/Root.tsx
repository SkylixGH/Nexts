import {App, Progress, Ring, useAppURL, useMenu, Button, useRouter, NavigationView} from '@nexts-stack/desktop-uix';
import React, {useEffect, useState} from 'react';
import './styles.scss';

/**
 *
 */
function Home() {
	return (
		<div>Home</div>
	);
}

/**
 *
 */
function About() {
	return (
		<div>About</div>
	);
}

/**
 * This is the app root component.
 * @returns The app root component.
 */
export default function Root() {
	const url = useAppURL();
	const router = useRouter(url);
	const menu = useMenu();
	const [loading, setLoading] = useState(true);
	const matchesAbout = router.matches('/about');

	useEffect(() => {
		router.addRoute('/about', <About />);
		router.addRoute('/', <Home />);

		setLoading(false);

		return () => {
			setLoading(true);

			router.removeRoute('/about');
			router.removeRoute('/');
		};
	}, []);

	return (
		<App center flowDirection={'row'}>
			<NavigationView metaBar sideBar sideRail={[
				{
					icon: {
						src: 'fluent:home-16-regular',
						size: 16,
					},
					action: () => {
						router.navigate('/');
					},
					active: '/',
				},
				{
					icon: {
						src: 'fluent:info-16-regular',
						size: 16,
					},
					action: () => {
						router.navigate('/about');
					},
					contextMenu: () => {
						menu.open({
							body: [
								{
									label: 'Quick Info',
									action: () => {
										router.navigate('/about');
									},
								},
							],
						});
					},
					active: '/about',
				},
			]}>
				{loading ? <Progress /> : router.render()}
			</NavigationView>
		</App>
	);
}
