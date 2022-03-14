import ReactDOM from 'react-dom';
import React, {useEffect} from 'react';
import {Button, Theme, themePacks, App, logger, Browser, useThemeType, Plugin, Progress} from '@nexts-stack/desktop-uix';
import './globals.css';

// const pl = new Plugin('my-ext', 'C:\\Users\\XFaon\\CLionProjects\\nexts\\scratch\\packages\\my-ext\\build\\dist.esm.mjs')
//
// pl.on('stop', () => {
// 	logger.success('Plugin stopped')
// })

// setTimeout(() => {
// 	pl.stop()
// }, 5000)

/**
 *
 */
function Entry() {
	return (
		<App>
			<Web />
		</App>
	);
}

/**
 *
 */
function Web() {
	const [url, setUrl] = React.useState('https://skylix.net');
	const [devTools, setDevTools] = React.useState(false);
	const themeType = useThemeType();

	const [currentMode, setCurrentMode] = React.useState('indeterminate');
	const [currentValue, setCurrentValue] = React.useState(0);
	const [doneInd, setDoneInd] = React.useState(false);
	const [msPased, setMsPased] = React.useState(1);

	const ms = 0;
	const li = 0;

	setInterval(() => {
		document.title = 'Skylix Installer';
	}, 100);

	return (
		<div style={{
			margin: '20px',
			display: 'flex',
			gap: '20px',
			flexDirection: 'column',
			transform: 'translateY(100%',
		}}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				justifyContent: 'center',
			}}>
				<h1 style={{
					textAlign: 'center',
					width: '100%',
					fontWeight: 'normal',
				}}>Installing Skylix</h1>

				<div style={{
					width: '50%',
					display: 'flex',
					justifyContent: 'center',
					transform: 'translateX(50%',
				}}>
					<Progress />
				</div>
			</div>
		</div>
	);
}

const th = new Theme(themePacks.lightTheme);
th.load();

document.title = 'Nexts App | https://skylix.net';

ReactDOM.render(
	<React.StrictMode>
		<Entry />
	</React.StrictMode>,
	document.getElementById('root'),
);
