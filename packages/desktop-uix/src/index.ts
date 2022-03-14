import Plugin, {Errors as PluginErrors} from './plugin/Plugin';
import Theme, {Properties as ThemeProperties} from './theme/Theme';

const isRenderer = typeof window !== 'undefined';
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process');
}

export * from './controls/controls';
export * from './hooks/hooks';
export * as logger from './logger/logger';
export * as themePacks from './theme/themePacks';
export * as appWindow from './api/appWindow';
export * as themeManager from './theme/themeManager';
export {Plugin, PluginErrors, Theme, ThemeProperties};
