import React from 'react';
import ReactDOM from 'react-dom';
import {App, Button, Progress, TextBox, Theme, themePacks, useMenu, logger} from '@nexts-stack/desktop-uix';
import './globals.css';

const handleTheme = () => {
	if (!localStorage.getItem('theme')) {
		localStorage.setItem('theme', 'dark');
	}

	const theme = new Theme(localStorage.getItem('theme') === 'dark' ? {
		...themePacks.darkTheme,
	} : themePacks.lightTheme);

	theme.load();
};

handleTheme();

/**
 * This is the app root component.
 * @returns The app root component.
 */
function Root() {
	const menu = useMenu();
	const [inFocus, setInFocus] = React.useState(false);
	const [userName, setUserName] = React.useState('');
	const [password, setPassword] = React.useState('');

	return (
		<App center>
			<div onContextMenu={(event) => {
				event.preventDefault();
				logger.log('Context Menu Opened');
				menu.open({
					header: [
						{
							icon: {
								src: 'mdi:github',
							},
							action: () => {
								window.open('https://github.com');
							},
						},
						{
							icon: {
								src: 'mdi:google',
							},
							action: () => {
								window.open('https://google.com');
							},
						},
						{
							icon: {
								src: 'mdi:microsoft',
							},
							action: () => {
								window.open('https://microsoft.com');
							},
						},
					],
					body: [
						{
							label: 'Restart App',
							action: () => {
								window.location.reload();
							},
						},
						{
							label: 'Nexts Github',
							action: () => {
								window.open('https://github.com/skylixgh/nexts');
							},
						},
					],
				});
			}} style={{
				padding: '10px',
				maxWidth: '400px',
				width: '100%',
			}}>
				<h1 style={{
					width: '100%',
					textAlign: 'center',
					fontWeight: 'normal',
					color: 'var(--text1)',
				}}>Login</h1>

				<Progress showValue={true} mode={(userName.length > 0 ? 50 : 0) + (password.length > 0 ? 50 : 0) > 0 ? 'determinate' : 'indeterminate'} value={(userName.length > 0 ? 50 : 0) + (password.length > 0 ? 50 : 0) > 0 ? (userName.length > 0 ? 50 : 0) + (password.length > 0 ? 50 : 0) : 0} />

				<br />

				<TextBox focus={inFocus} placeholder='Username or Email Username or Email Username or Email Username or Email Username or Email Username or Email Username or Email Username or Email ' onChange={(v) => setUserName(v)}/>

				<br />

				<TextBox type={'password'} placeholder={'Password'} onChange={(v) => setPassword(v)} />

				<br />

				<div style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}>
					<div style={{
						display: 'flex',
						gap: '10px',
					}}>
						<Button mode={'secondary'} onClick={() => {
							setTimeout(() => {
								setInFocus(() => false);
								setInFocus(() => true);
							}, 0);
						}}>Back</Button>

						<Button mode={'secondary'} onClick={() => {
							const currentTheme = localStorage.getItem('theme');

							if (currentTheme === 'dark') {
								localStorage.setItem('theme', 'light');
							} else {
								localStorage.setItem('theme', 'dark');
							}

							handleTheme();
						}}>Toggle Theme</Button>
					</div>

					<Button onClick={() => {
						setTimeout(() => {
							setInFocus(() => false);
							setInFocus(() => true);
						}, 0);
					}}>Focus</Button>
				</div>

				{/* <br /> */}

				{/* <div> */}
				{/* 	{log.map((v, i) => <div key={i}>{v}</div>)} */}
				{/* </div> */}
			</div>
		</App>
	);
}

ReactDOM.render(
	<Root />,
	document.getElementById('root'),
);
