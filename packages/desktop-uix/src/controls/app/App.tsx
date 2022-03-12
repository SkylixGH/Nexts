import React, {useEffect, useState} from 'react'
import styles from './App.module.scss'
import {Icon} from '@iconify/react'
import {appWindow, Button} from '../..'

/**
 * The properties of the app.
 */
export interface Props {
	/**
	 * The app view layer.
	 */
	children: JSX.Element | JSX.Element[];
}

/**
 * The app ref.
 */
export interface Ref {
}

const App = React.forwardRef<Ref, Props>((props) => {
	const isElectron = typeof window !== 'undefined' && window.process && window.process.type

	const [title, setTitle] = useState(window.document.title)
	const [titleBarVisible, setTitleBarVisible] = useState(isElectron)
	const [windowMaximized, setWindowMaximized] = useState(false)
	const [reactError, setReactError] = useState<null | Error>(null)

	useEffect(() => {
		const titleListener = new MutationObserver(function() {
			setTitle(window.document.title)
		})

		if (!document.querySelector('title')) {
			const titleElement = document.createElement('title')
			document.head.appendChild(titleElement)
		}


		titleListener.observe(
			document.querySelectorAll('title')[0],
			{subtree: true, characterData: true, childList: true},
		)

		return () => {
			titleListener.disconnect()
		}
	})

	return (
		<div className={styles.root}>
			{ titleBarVisible && <div className={styles.titleBar}>
				<div className={styles.titleBar_app}>
					<div>
						<img draggable={false} src={'https://skylix.net/LogoIconDark.svg'} alt={'-'} />
					</div>

					<span>{title}</span>
				</div>

				<div className={styles.titleBar_buttons}>
					<button onClick={() => appWindow.minimize()}>
						<Icon style={{
							fontSize: '17px',
						}} icon={'fluent:minimize-16-regular'} />
					</button>

					<button onClick={() => setWindowMaximized(!windowMaximized)}>
						<Icon icon={`fluent:${windowMaximized ? 'restore' : 'maximize'}-16-regular`} />
					</button>

					<button className={styles.titleBar_buttonsClose}>
						<Icon icon={'fluent:dismiss-16-regular'} />
					</button>
				</div>
			</div> }

			<div className={`${styles.content} ${titleBarVisible ? '' : styles.content_noTitleBar}`}>
				{props.children}
				<Button mode={'text'} onClick={() => setReactError(new Error('Test error'))}>
					Test error
				</Button>
			</div>

			<div onClick={() => setReactError(null)} className={`${styles.errorBox} ${reactError ? '' : styles.errorBox_hide}`}>
				<Icon icon={'fluent:error-circle-16-regular'} />
			</div>
		</div>
	)
})

App.displayName = 'App'
export default App
