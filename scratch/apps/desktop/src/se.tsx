import React, {createRef, useRef} from 'react';
import ReactDOM from 'react-dom';
import {App, Button, ButtonRef, TextBox, Theme, themePacks} from '@nexts-stack/desktop-uix';
import './globals.css';

const theme = new Theme(themePacks.darkTheme);
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
		<App>
			<div style={{
				padding: '10px',
			}}>
				<TextBox focus={inFocus} placeholder='Hello World' onChange={(v) => {
					document.title = `desk | ${v}`;
					console.log(v);
				}} onFocus={() => {
					logData('[input] Focused');
				}} onBlur={() => {
					logData('[input] Blurred');
				}} onEnter={() => {
					logData('[input] Submit');
				}} />

				<br />

				<Button onClick={() => {
					setTimeout(() => {
						setInFocus(() => false);
						setInFocus(() => true);
					}, 1000);
				}}>Focus</Button>

				<br />

				<div>
					{log.map((v, i) => <div key={i}>{v}</div>)}
				</div>
			</div>
		</App>
	);
}

ReactDOM.render(
	<Root />,
	document.getElementById('root'),
);
