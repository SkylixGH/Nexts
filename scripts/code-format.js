import {info} from './util/logger.js'
import path from 'path'
import {fileURLToPath} from 'url'

const dirname = fileURLToPath(path.dirname(import.meta.url))

const formatArgs = [
	path.join(dirname, './node_modules/eslint/bin/eslint.js'),
	'--ext',
	'.tsx,.ts,.js,.jsx',
	'--fix',
]

info('Code Formatting')
info(`Spawn > node ${formatArgs.join(' ')}`)
