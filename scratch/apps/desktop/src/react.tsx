import ReactDOM from 'react-dom'
import React from 'react'
import {Plugin, logger, Button, Theme, themePacks, App} from '@nexts-stack/desktop-uix'
import './globals.css'

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
		<Button mode={'secondary'}>Sky lix</Button>
		<Button mode={'outline'}>Lol Avery</Button>
		<Button mode={'text'}>Lol Avery</Button>

		{/* Lorem ipsum */}
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rutrum augue vel dolor finibus, et ultrices arcu lacinia. Morbi elementum dapibus elit, nec convallis ex ultricies nec. Vivamus a elementum est, ut auctor metus. Fusce nec sem a dui interdum laoreet ut vitae libero. Fusce eget purus porttitor, eleifend massa eget, vestibulum ligula. Quisque aliquam nisi vitae lectus aliquet faucibus. Proin quam nisl, feugiat efficitur enim quis, luctus lobortis mi.

			Suspendisse potenti. Ut et lorem et elit pulvinar hendrerit ac consectetur augue. Sed nisi est, iaculis eget condimentum quis, auctor vitae tellus. Suspendisse potenti. Morbi luctus sem vitae elit mattis hendrerit. Curabitur faucibus dignissim ipsum, vitae rhoncus arcu rutrum et. Suspendisse commodo, mi in volutpat mattis, tellus ante varius nisi, eleifend egestas sem enim ac justo. Fusce sodales iaculis ex. Pellentesque dui nisl, vehicula eu eleifend eu, tristique eu nisl. Vivamus eget urna aliquet, vehicula sem et, gravida tortor. Nullam at gravida augue. Vivamus at sem metus. Cras ac sem id sapien dictum fringilla.

			Morbi condimentum nibh vitae odio cursus imperdiet. Pellentesque at tempor dolor. Duis eleifend pretium felis lacinia volutpat. Proin orci enim, egestas eget imperdiet at, cursus et tortor. Vestibulum porttitor pellentesque orci, eget sodales urna dapibus ac. Donec elementum purus eget tristique facilisis. Aenean imperdiet elementum purus, sed lobortis urna aliquet id. Nunc hendrerit tincidunt orci malesuada varius. Aliquam vel suscipit eros. Fusce porttitor laoreet sapien, in dictum eros tristique sed. Duis sed scelerisque velit. Integer eleifend turpis non quam porttitor, vitae finibus felis volutpat. Vestibulum id augue eleifend, malesuada odio sit amet, aliquet nibh.

			Morbi finibus tempor blandit. Praesent dictum, justo id semper consequat, tellus ligula mollis nulla, sit amet suscipit sapien justo et ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam molestie neque vestibulum, placerat tortor sit amet, volutpat erat. Vivamus pellentesque ligula vitae lacinia pellentesque. Fusce aliquam et mi vitae fringilla. Duis in libero id leo commodo maximus vitae eget lectus. Fusce commodo lectus ac libero rutrum facilisis. Etiam sit amet felis metus. Nullam quis pretium lorem. Quisque vulputate ullamcorper ligula, in pellentesque mi ultrices at. Aliquam blandit, nisi nec gravida lacinia, eros mauris lobortis metus, nec aliquam lectus justo sit amet nulla. Aenean laoreet eros nibh, quis faucibus est vehicula in.

			Donec semper enim neque, et sagittis tellus maximus sed. Praesent scelerisque augue convallis ligula cursus, at ultricies purus pellentesque. Aenean vel enim augue. Sed sapien mauris, tristique eu diam quis, elementum rhoncus elit. Etiam odio sapien, lacinia at interdum ut, blandit non ante. Etiam vel ultrices quam. Nulla luctus nibh risus, sed laoreet orci commodo rhoncus. Phasellus cursus, massa quis sodales cursus, eros nibh posuere sem, et congue odio ipsum in eros. Nulla commodo et tellus eget blandit. Ut varius iaculis nunc, in rhoncus metus hendrerit a. Nulla egestas dui eros. Sed tempus, augue quis finibus feugiat, libero enim malesuada mi, eu cursus nisi tortor at lectus. Curabitur id nibh sed erat rhoncus lobortis sit amet eget dolor. Nullam elementum sodales mauris vestibulum viverra. Quisque et purus at nisl vestibulum finibus ut et odio.
		</p>
	</App>,
	document.getElementById('root'),
)
