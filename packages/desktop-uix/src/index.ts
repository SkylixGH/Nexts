import Plugin, {Errors as PluginErrors} from './plugin/Plugin'
import Theme, {Properties as ThemeProperties} from './theme/Theme'

const isRenderer = typeof window !== 'undefined'
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process')
}

export * from './controls/controls'
export * as logger from './logger/logger'
export * as themePacks from './theme/themePacks'
export * as appWindow from './api/appWindow'
export {Plugin, PluginErrors, Theme, ThemeProperties}
