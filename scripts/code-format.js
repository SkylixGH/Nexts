import {info} from './util/logger.js'
import {fileURLToPath} from 'url'
import {spawn} from 'child_process'
import path from 'path'

const dirname = fileURLToPath(path.dirname(import.meta.url))
const eslintPath = './node_modules/eslint/bin/eslint.js'
let finished = 0

info('Code Formatting');

['.js', '.ts', '.jsx', '.tsx'].forEach((ext) => {
	const eslint = spawn(`node${ process.platform === 'win32' ? '.exe' : ''}`, [eslintPath, `./**/*${ext}`, '--fix'], {
		cwd: path.join(dirname, '..'),
		stdio: 'inherit',
	})

	eslint.on('exit', () => {
		finished++

		if (finished === 4) {
			info('Code Formatting Complete')
		}
	})
})
