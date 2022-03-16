import Plugin, {Errors as PluginErrors} from './plugin/Plugin';
import Theme, {Properties as ThemeProperties} from './theme/Theme';
import {Settings as MenuSettings} from './api/menu';

const isRenderer = typeof window !== 'undefined';
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process');
}

export * from './controls/controls';
export * from './hooks/hooks';
export * as logger from './logger/logger';
export * as themePacks from './theme/themePacks';
export * as themeManager from './theme/themeManager';
export * as menu from './api/menu';
export {Plugin, PluginErrors, Theme, ThemeProperties, MenuSettings};
