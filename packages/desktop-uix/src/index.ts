const isRenderer = typeof window !== 'undefined' && window.process && window.process.type
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process')
}

export * as pluginHost from './pluginHost/pluginHost'
export * as logger from './logger/logger'
