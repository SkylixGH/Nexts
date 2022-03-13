import ReactDOM from 'react-dom'
import React from 'react'
import {Button, Theme, themePacks, App, logger, Browser, useThemeType, Plugin} from '@nexts-stack/desktop-uix'
import './globals.css'

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
function Web() {
	const [url, setUrl] = React.useState('https://skylix.net')
	const [devTools, setDevTools] = React.useState(false)
	const themeType = useThemeType()

	return (
		<div style={{
			margin: '20px',
			display: 'flex',
			gap: '20px',
			flexDirection: 'column',
		}}>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				gap: '20px',
			}}>
				<Button mode={'primary'}>Hello World</Button>
				<Button mode={'outline'} onClick={() => {
					if (themeType === 'dark') {
						new Theme(themePacks.lightTheme).load()
					} else {
						new Theme(themePacks.darkTheme).load()
					}
				}}>Theme: {themeType}</Button>
				<Button mode={'outline'} onClick={() => setDevTools(!devTools)}>Toggle Dev Tools</Button>
			</div>
			<br />
			{/* <Browser openDevTools={devTools} url={'https://www.microsoft.com/en-us/windows/windows-11#pchealthcheck'} /> */}
		</div>
	)
}

const th = new Theme(themePacks.darkTheme)
th.load()

document.title = 'Nexts App | https://skylix.net'

ReactDOM.render(
	<App>
		<Web />
	</App>,
	document.getElementById('root'),
)
