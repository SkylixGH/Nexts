import ReactDOM from 'react-dom'
import React from 'react'
import {Plugin, logger, Button, Theme} from '@nexts-stack/desktop-uix'

// const pl = new Plugin('my-ext', 'C:\\Users\\XFaon\\CLionProjects\\nexts\\scratch\\packages\\my-ext\\build\\dist.esm.mjs')

// pl.on('stop', () => {
// 	logger.success('Plugin stopped')
// })

// setTimeout(() => {
// 	pl.stop()
// }, 5000)

const th = new Theme({
	accent: '#000',
	accent2: '#999',
})

th.load()

ReactDOM.render(
	<div>
		<Button>Lol Avery</Button>
	</div>,
	document.getElementById('root'),
)
