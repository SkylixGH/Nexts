import ReactDOM from 'react-dom'
import React from 'react'
import {Plugin, logger, Button, Theme, themePacks, App} from '@nexts-stack/desktop-uix'

// const pl = new Plugin('my-ext', 'C:\\Users\\XFaon\\CLionProjects\\nexts\\scratch\\packages\\my-ext\\build\\dist.esm.mjs')

// pl.on('stop', () => {
// 	logger.success('Plugin stopped')
// })

// setTimeout(() => {
// 	pl.stop()
// }, 5000)

const th = new Theme(themePacks.darkTheme)
th.load()

ReactDOM.render(
	<App>
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			gap: '2px',
			cursor: 'grab',
			padding: '10px',
			webkitAppRegion: 'drag',
		}}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2px',
			}}>
				<div style={{
					display: 'flex',
					width: '1px',
					height: '1px',
					background: '#999',
				}} />

				<div style={{
					display: 'flex',
					width: '1px',
					height: '1px',
					background: '#999',
				}} />

				<div style={{
					display: 'flex',
					width: '1px',
					height: '1px',
					background: '#999',
				}} />
			</div>

			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2px',
			}}>
				<div style={{
					display: 'flex',
					width: '1px',
					height: '1px',
					background: '#999',
				}} />

				<div style={{
					display: 'flex',
					width: '1px',
					height: '1px',
					background: '#999',
				}} />

				<div style={{
					display: 'flex',
					width: '1px',
					height: '1px',
					background: '#999',
				}} />
			</div>
		</div>

		<Button>Lol Avery</Button>
		<Button mode={'secondary'}>Lol Avery</Button>
		<Button mode={'outline'}>Lol Avery</Button>
		<Button mode={'text'}>Lol Avery</Button>
	</App>,
	document.getElementById('root'),
)
