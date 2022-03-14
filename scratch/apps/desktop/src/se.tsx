import React from 'react';
import ReactDOM from 'react-dom';
import {App, TextBox, Theme, themePacks} from '@nexts-stack/desktop-uix';
import './globals.css';

const theme = new Theme(themePacks.darkTheme);
theme.load();

ReactDOM.render(
	<App>
		<div style={{
			padding: '10px',
		}}>
			<TextBox placeholder='Hello World' onChange={(v) => {
				document.title = `desk | ${v}`;
				console.log(v)
			}} />
		</div>
	</App>,
	document.getElementById('root'),
);
