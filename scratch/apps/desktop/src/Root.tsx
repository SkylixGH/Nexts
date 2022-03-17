import {App, Progress, Ring, useAppURL, useMenu, Button, useRouter, NavigationView} from '@nexts-stack/desktop-uix';
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

	return (
		<App center flowDirection={'row'}>
			<NavigationView metaBar sideBar sideRail>
				<h1>Hello World!</h1>
			</NavigationView>
		</App>
	);
}
