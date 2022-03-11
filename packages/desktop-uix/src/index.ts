import Plugin, {Errors as PluginErrors} from './plugin/Plugin'
import Theme from './theme/Theme'

const isRenderer = typeof window !== 'undefined' && window.process && window.process.type
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process')
}

window.onerror = (msg, url, lineNo, columnNo, error) => {
	document.body.innerHTML = [
		'<div style="width: 100vw; height: 32px; background: #202020; -webkit-app-region: drag; margin-top: -10px; margin-left: -10px; display: flex; align-items: center; justify-content: flex-end;">',
		'	<button onmouseover="this.style.color = \'#fff\'; this.style.background = \'#FF5555\'" onmouseleave="this.style.color = \'#999\'; this.style.background = \'transparent\'" class="button" style="cursor: pointer; -webkit-app-region: no-drag; width: 45px; height: 32px; color: #999; background: transparent; border: none;" onclick="window.close()">✕</button>',
		'</div>',
		'<h1 style="font-family: sans-serif">Failed to start ReactJS</h1>',
		'<p style="font-family: sans-serif">',
		'	<pre style="font-family: monospace; white-space: pre-wrap">',
		error?.stack,
		'	</pre>',
		'</p>',
	].join('\n')

	document.body.style.background = '#272727'
	document.body.style.color = '#fff'
}

export * from './controls/controls'
export * as logger from './logger/logger'
export {Plugin, PluginErrors, Theme}
