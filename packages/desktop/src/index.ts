import {initialize} from '@electron/remote/main';
export * as app from './app/app';
export * as windowManager from './windowManager/windowManager';
import Window, {Settings as WindowSettings, Errors as WindowErrors} from './window/Window';
import Channel, {Errors as ChannelErrors} from './window/Channel';

initialize();

export {Window, WindowSettings, WindowErrors, Channel, ChannelErrors};
