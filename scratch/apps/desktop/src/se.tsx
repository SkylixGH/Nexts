import React from 'react';
import ReactDOM from 'react-dom';
import {App, Button, Progress, TextBox, Theme, themePacks, useMenu, logger} from '@nexts-stack/desktop-uix';
import './globals.css';
import Root from './Root';

const handleTheme = () => {
	if (!localStorage.getItem('theme')) {
		localStorage.setItem('theme', 'dark');
	}

	const theme = new Theme(localStorage.getItem('theme') === 'dark' ? {
		...themePacks.lightTheme,
	} : themePacks.lightTheme);

	theme.load();
};

handleTheme();

ReactDOM.render(
	<Root />,
	document.getElementById('root'),
);
