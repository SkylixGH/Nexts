import {App, Progress, Ring, useAppURL, useMenu, Button, useRouter, NavigationView, RouterView, useChannel, useAppWindow} from '@nexts-stack/desktop-uix';
import React, {useEffect, useState} from 'react';
import './styles.scss';

/**
 *
 */
function Home() {
	const helloChannel = useChannel('hello');
	const serviceChannel = useChannel('service');

	const appWin = useAppWindow();

	useEffect(() => {
		const mainMessageListener = (msg: any) => {
			console.log(msg);
			alert(`Message From main: ${msg.msg}`);
		};

		helloChannel.events.on('message', mainMessageListener);

		return () => {
			helloChannel.events.removeListener('message', mainMessageListener);
		};
	});

	document.title = `My Desktop App | ID = ${appWin.windowID}`;

	return (
		<div>
			<Button onClick={() => {
				helloChannel.executeTask('add', {
					a: 1,
					b: '10',
				}).then((sum) => {
					alert(`Sum = ${sum}`);
				}).catch((err) => {
					alert(`Error: ${err}`);
				});
			}}>About</Button>

			<Button onClick={() => {
				serviceChannel.executeTask('start:http', {
					port: 8090,
				}).then(() => {
					alert(`Server running at 8090`);
				}).catch((err) => {
					alert(`Error: ${err}`);
				});
			}}>HTTP Server</Button>

			<br />

			<ul>
				<li>Window ID: {appWin.windowID}</li>
			</ul>
		</div>
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
			<NavigationView router={router} sideRail={[
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
								{
									label: 'UwU',
									action: () => {
										alert('UwU');
									},
								},
							],
						});
					},
					active: '/about',
				},
			]}>
				{loading ? <Progress /> : <RouterView router={router} />}
			</NavigationView>
		</App>
	);
}
