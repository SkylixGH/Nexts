import React, {useEffect} from 'react'
import styles from './App.module.scss'
import {Icon} from '@iconify/react'

/**
 * The properties of the button.
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
	const [title, setTitle] = React.useState(window.document.title)

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
			<div className={styles.titleBar}>
				<div>
					<span>{title}213</span>
				</div>
			</div>

			<div className={styles.content}>
				{props.children}
			</div>
		</div>
	)
})

App.displayName = 'App'
export default App
