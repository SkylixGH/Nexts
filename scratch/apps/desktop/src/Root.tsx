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

	useEffect(() => {
		router.addRoute('/about', <About />);
		router.addRoute('/', <Home />);

		return () => {
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
					active: router.matches('/'),
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
					active: router.matches('/about'),
				},
			]}>
				{router.render()}
			</NavigationView>
		</App>
	);
}
