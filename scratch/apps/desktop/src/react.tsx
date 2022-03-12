import ReactDOM from 'react-dom'
import React from 'react'
import {Button, Theme, themePacks, App, logger, useThemeType} from '@nexts-stack/desktop-uix'
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
	const themeType = useThemeType()

	return (
		<div style={{
			margin: '20px',
		}}>
			<Button mode={'primary'}>Hello World</Button>
			<Button mode={'secondary'} onClick={() => {
				if (themeType === 'dark') {
					new Theme(themePacks.lightTheme).load()
				} else {
					new Theme(themePacks.darkTheme).load()
				}
			}}>Theme: {themeType}</Button>
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
