import Plugin, {Errors as PluginErrors} from './plugin/Plugin';
import Theme, {Properties as ThemeProperties} from './theme/Theme';

const isRenderer = typeof window !== 'undefined';
if (!isRenderer) {
	throw new Error('Cannot import UIX module in the main process');
}

(window as any)['__nexts__stack__desktop__uix__'] = {
	remote: window.require ? window.require('@electron/remote') : null,
};

export * from './controls/controls';
export * from './hooks/hooks';
export * as logger from './logger/logger';
export * as themePacks from './theme/themePacks';
export * as themeManager from './theme/themeManager';
export {Plugin, PluginErrors, Theme, ThemeProperties};
