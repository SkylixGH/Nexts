import React, {createRef, useRef} from 'react';
import ReactDOM from 'react-dom';
import {App, Button, ButtonRef, Progress, TextBox, Theme, themePacks} from '@nexts-stack/desktop-uix';
import './globals.css';
import {NextsControlsTheme} from '@nexts-stack/desktop-uix/build/types/theme/themePacks';

const theme = new Theme({
	...themePacks.lightTheme,
} as NextsControlsTheme);
theme.load();

/**
 * This is the app root component.
 * @returns The app root component.
 */
function Root() {
	const [log, setLog] = React.useState([] as string[]);
	const [inFocus, setInFocus] = React.useState(false);

	const logData = (text: string) => {
		setLog([...log, text]);
	};

	return (
		<App center>
			<div style={{
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

				<Progress showValue mode={'determinate'} value={40} />

				<br />

				<TextBox focus={inFocus} placeholder='Username or Email' onChange={(v) => {
					document.title = `desk | ${v}`;
				}} onFocus={() => {
					logData('[input] Focused');
				}} onBlur={() => {
					logData('[input] Blurred');
				}} onEnter={() => {
					logData('[input] Submit');
				}} />

				<br />

				<TextBox type={'password'} placeholder={'Password'} />

				<br />

				<div style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}>
					<Button mode={'secondary'} onClick={() => {
						setTimeout(() => {
							setInFocus(() => false);
							setInFocus(() => true);
						}, 0);
					}}>Back</Button>

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
