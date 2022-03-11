import Plugin, {Errors as PluginErrors} from './plugin/Plugin'

const isRenderer = typeof window !== 'undefined' && window.process && window.process.type
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process')
}

export * from './controls/controls'
export * as logger from './logger/logger'
export {Plugin, PluginErrors}
