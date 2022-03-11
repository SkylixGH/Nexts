import {initialize} from '@electron/remote/main'
export * as app from './app/app'
export * as windowManager from './windowManager/windowManager'
import Window, {Settings as WindowSettings, Errors as WindowErrors} from './window/Window'

initialize()

export {Window, WindowSettings, WindowErrors}
