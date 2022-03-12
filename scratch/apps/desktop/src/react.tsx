import ReactDOM from 'react-dom'
import React from 'react'
import {Browser, Button, Theme, themePacks, App} from '@nexts-stack/desktop-uix'
import './globals.css'

// const pl = new Plugin('my-ext', 'C:\\Users\\XFaon\\CLionProjects\\nexts\\scratch\\packages\\my-ext\\build\\dist.esm.mjs')

// pl.on('stop', () => {
// 	logger.success('Plugin stopped')
// })

// setTimeout(() => {
// 	pl.stop()
// }, 5000)

/**
 *
 */
function Web() {
	const [url, setUrl] = React.useState('https://skylix.net')

	return (
		<div style={{
			margin: '20px',
			width: 'calc(100vw - 40px)',
			height: 'calc(100vh - 40px)',
		}}>
			<Browser url={url} />
		</div>
	)
}

const th = new Theme(themePacks.lightTheme)
th.load()

document.title = 'Nexts App | https://skylix.net'

ReactDOM.render(
	<App>
		<Web />
	</App>,
	document.getElementById('root'),
)
