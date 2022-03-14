import Task from './task/Task';

// if (!process.env.NEXTS_PLUGIN_ENV) {
// 	throw new Error('The plugin is not running in a NEXTS based application')
// } else if (process.env.NEXTS_PLUGIN_ENV !== 'desktop') {
// 	throw new Error('The plugin is not running in a desktop application')
// }

export * as plugin from './plugin/plugin';
export {Task};
