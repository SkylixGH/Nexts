const {app, windowManager} = require('@nexts-stack/desktop')

app.on('ready', () => {
	console.log('[NEXTS] Creating window')

	windowManager.create({
		frame: {
			width: 800,
			height: 600,
		},
	})
})
