const { spawn } = require('child_process')
const electron = require('electron')

const proc = spawn(electron, ['./el.js'], {
	cwd: __dirname,
	env: {
		NEXTS_DEV_RENDERER: 'https://google.com'
	},
	stdio: 'inherit'
})
