import {App, Progress, Ring, useAppURL, useMenu, Button, useRouter} from '@nexts-stack/desktop-uix';
import React, {useEffect, useState} from 'react';
import './styles.scss';
import Plus from '@iconify/icons-fluent/add-16-regular';
import Sub from '@iconify/icons-fluent/subtract-16-regular';
import * as events from 'events';

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
		const routeChangeURL = (old: string, newURL: string) => {
			console.log(`${old} ->> ${newURL}`);
		};

		router.events.on('change', routeChangeURL);
		router.addRoute('/', <Home />);
		router.addRoute('/about/:ceo', <About />);

		return () => {
			router.events.removeListener('change', routeChangeURL);
			router.removeRoute('/');
			router.removeRoute('/about/:ceo');
		};
	}, []);

	return (
		<App center flowDirection={'row'}>
			<p>{url.urlPathName}</p>

			<div style={{
				padding: '10px',
				display: 'flex',
				gap: '10px',
				color: 'var(--text1)',
			}}>
				<a onContextMenu={(event) => {
					event.preventDefault();

					menu.open({
						body: [
							{
								label: 'Open',
								action: () => {
									router.navigate('/');
								},
							},
						],
					});
				}} href={'/'} onClick={function(events) {
					events.preventDefault();
					router.navigate('/');
				}}>Home</a>

				<a onContextMenu={(event) => {
					event.preventDefault();

					menu.open({
						body: [
							{
								label: 'Open',
								action: () => {
									router.navigate('/about/xfaon');
								},
							},
						],
					});
				}} href={'/about'} onClick={function(events) {
					events.preventDefault();
					router.navigate('/about/xfaon');
				}}>About</a>
			</div>

			{router.render()}
		</App>
	);
}
