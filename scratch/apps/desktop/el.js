const {app, windowManager} = require('@nexts-stack/desktop')

app.on('ready', () => {
	windowManager.create({
		frame: {
			width: 800,
			height: 600,
		},
	})
})

