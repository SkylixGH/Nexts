import ReactDOM from 'react-dom'
import Button from './Button'
import {pluginHost} from '@nexts-stack/desktop-uix'
import React from 'react'

await pluginHost.initialize('my-ext', 'C:\\Users\\XFaon\\CLionProjects\\nexts\\scratch\\packages\\my-ext\\build\\dist.esm.mjs')

ReactDOM.render(
	<div style={{
		webkitAppRegion: 'drag',
	}}>
		<Button>Lol Avery</Button>
	</div>,
	document.getElementById('root'),
)
