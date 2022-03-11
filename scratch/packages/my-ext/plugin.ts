
import {plugin} from '@nexts-stack/desktop-plugin'

const tsk = plugin.task('hello')

tsk.on('message', (msg) => {
	console.log(msg)
})

setTimeout(() => {
	tsk.send({'HEY': 'yo'})
	console.error('=uwu=')
	console.log('Ayee')
}, 0)
