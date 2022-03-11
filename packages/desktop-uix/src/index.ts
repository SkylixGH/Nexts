import Plugin, {Errors as PluginErrors} from './plugin/Plugin'

const isRenderer = typeof window !== 'undefined' && window.process && window.process.type
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process')
}

export * as logger from './logger/logger'
export {Plugin, PluginErrors}
