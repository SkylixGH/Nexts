import ReactDOM from 'react-dom'
import Button from './Button'
import React from 'react'
import {Plugin, logger} from '@nexts-stack/desktop-uix'

const pl = new Plugin('my-ext', 'C:\\Users\\XFaon\\CLionProjects\\nexts\\scratch\\packages\\my-ext\\build\\dist.esm.mjs')

pl.on('stop', () => {
	logger.success('Plugin stopped')
})

setTimeout(() => {
	pl.stop()
}, 5000)

ReactDOM.render(
	<div style={{
		webkitAppRegion: 'drag',
	}}>
		<Button>Lol Avery</Button>
	</div>,
	document.getElementById('root'),
)
