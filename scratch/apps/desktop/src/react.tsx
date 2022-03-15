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
		<App center>
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
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			<Browser url={'https://skylix.net'} />
		</div>
	);
}

const th = new Theme(themePacks.darkTheme);
th.load();

document.title = 'Nexts App | https://skylix.net';

ReactDOM.render(
	<React.StrictMode>
		<Entry />
	</React.StrictMode>,
	document.getElementById('root'),
);
