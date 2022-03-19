import {App, Progress, Ring, useAppURL, useMenu, Button, useRouter, NavigationView, RouterView, useChannel, useAppWindow, Browser} from '@nexts-stack/desktop-uix';
import React, {useEffect, useRef, useState} from 'react';
import './styles.scss';
import {EventEmitter} from 'events';

const emter = new EventEmitter();

/**
 *
 */
function HTTPServer() {
	const [serverRunning, setServerRunning] = useState(false);
	const [loading, setLoading] = useState(true);
	const service = useChannel('service');

	useEffect(() => {
		const serverStateList = () => {
			(async () => {
				setLoading(true);

				setTimeout(async () => {
					const isRunning = await service.executeTask<object, boolean>('server:status', {});
					setServerRunning(isRunning);

					setLoading(false);
				}, 1000);
			})();
		};

		emter.on('u', serverStateList);

		(async () => {
			setTimeout(async () => {
				const isRunning = await service.executeTask<object, boolean>('server:status', {});
				setServerRunning(isRunning);

				setLoading(false);
			}, 1000);
		})();

		return () => {
			emter.removeListener('u', serverStateList);
		};
	}, []);

	const toggleServer = () => {
		if (serverRunning) {
			service.executeTask('server:stop', {});
			setServerRunning(false);
		} else {
			service.executeTask('server:start', {});
			setServerRunning(true);
		}
	};

	const htmlRendererThing = useRef<HTMLDivElement>(null);

	return (
		<div style={{
			width: '100%',
		}}>
			<h1>HTTP Server</h1>
			{loading ? <div style={{
				display: 'flex',
				gap: '10px',
				alignItems: 'center',
			}}>
				<Ring />
				<Progress />
			</div> : (
				serverRunning ? <Button onClick={() => toggleServer()}>Stop</Button> : <Button onClick={() => toggleServer()}>Start</Button>
			)}

			<br />

			<textarea onInput={(event) => {
				service.executeTask('server:set-html', {
					html: event.currentTarget.value ?? '',
				});
			}} placeholder='Render HTML'>
			</textarea>

			{serverRunning ? <Browser url="http://localhost:8090" /> : null}
		</div>
	);
}

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
	const service = useChannel('service');
	const [ar, setAr] = useState(false);

	useEffect(() => {
		router.addRoute('/about', <About />);
		router.addRoute('/', <Home />);
		router.addRoute('/http', <HTTPServer />);

		setTimeout(() => {
			setAr(true);
		}, 1000);

		setLoading(false);

		return () => {
			setLoading(true);

			router.removeRoute('/about');
			router.removeRoute('/');
			router.removeRoute('/http');
		};
	}, []);

	return (
		<App appReady={ar} center flowDirection={'row'}>
			<NavigationView sideBar={<HTTPServer />} router={router} sideRail={[
				{
					icon: {
						src: 'https://avatars.githubusercontent.com/u/96595613?s=400&u=44f1348ed2de89f4188524435d8a1bca61d99995&v=4',
						size: 16,
						type: 'image',
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
				{
					icon: {
						src: 'fluent:server-multiple-20-regular',
					},
					action: () => {
						router.navigate('/http');
					},
					contextMenu: () => {
						menu.open({
							body: [
								{
									label: 'Start HTTP Server',
									action: () => {
										service.executeTask('server:start', {});
										emter.emit('u');
									},
								},
								{
									label: 'Stop HTTP Server',
									action: () => {
										service.executeTask('server:stop', {});
										emter.emit('u');
									},
								},
							],
						});
					},
					active: '/http',
				},
			]}>
				{loading ? <Progress /> : <RouterView router={router} />}
			</NavigationView>
		</App>
	);
}
