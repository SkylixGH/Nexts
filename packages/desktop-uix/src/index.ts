import Plugin, {Errors as PluginErrors} from './plugin/Plugin'
import Theme from './theme/Theme'

const isRenderer = typeof window !== 'undefined' && window.process && window.process.type
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process')
}

window.onerror = (msg, url, lineNo, columnNo, error) => {
	document.body.innerHTML = [
		'<h1 style="font-family: sans-serif">Failed to start ReactJS</h1>',
		'<p style="font-family: sans-serif">',
		'	<pre style="font-family: monospace; white-space: pre-wrap">',
		error?.stack,
		'	</pre>',
		'</p>',
	].join('')

	document.body.style.background = '#121212'
	document.body.style.color = '#fff'
}

export * from './controls/controls'
export * as logger from './logger/logger'
export {Plugin, PluginErrors, Theme}
