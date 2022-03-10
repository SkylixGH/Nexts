const {app, windowManager} = require('@nexts-stack/desktop')

app.on('ready', () => {
	console.log('\x1b[32m%s\x1b[0m', 'App is ready for action!')
	console.error('Notice: This app is not ready for production use.')

	windowManager.create({
		frame: {
			width: 800,
			height: 600,
		},
	})
})
