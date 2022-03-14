import React from 'react';
import ReactDOM from 'react-dom';
import {App, Theme, themePacks} from '@nexts-stack/desktop-uix';
import './globals.css';

const theme = new Theme(themePacks.darkTheme);
theme.load();

ReactDOM.render(
	<App>
		<div>Hello World</div>
	</App>,
	document.getElementById('root'),
);
