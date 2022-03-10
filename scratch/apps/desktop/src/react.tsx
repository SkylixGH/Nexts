import ReactDOM from 'react-dom'
import Button from './Button'

ReactDOM.render(
	<div style={{
		webkitAppRegion: 'drag',
	}}>
		<Button>Lol Avery</Button>
	</div>,
	document.getElementById('root'),
)
