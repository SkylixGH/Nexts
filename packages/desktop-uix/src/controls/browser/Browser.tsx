import React, {useEffect} from 'react'
import styles from './Browser.module.scss'
import {Icon} from '@iconify/react'

/**
 * The properties of the browser.
 */
export interface Props {
	/**
	 * The URL to load with the browser.
	 */
	url: string

	/**
	 * Open the webview dev tools.
	 */
	openDevTools?: boolean
}

/**
 * The button ref.
 */
export interface Ref {
}

const Button = React.forwardRef<Ref, Props>((props) => {
	const isElectron = typeof window !== 'undefined' && window.process && window.process.type
	const webViewRef = React.useRef<any>(null)

	useEffect(() => {
		const domLoadListener = () => {
			if (props.openDevTools && !webViewRef.current.isDevToolsOpened()) {
				webViewRef.current.openDevTools()
			} else if (webViewRef.current.isDevToolsOpened()) {
				webViewRef.current.closeDevTools()
			}
		}

		if (webViewRef.current) {
			webViewRef.current.addEventListener('dom-ready', domLoadListener)

			if (webViewRef.current.readyState === 'complete') {
				domLoadListener()
			}
		}

		return () => {
			if (webViewRef.current) {
				webViewRef.current.removeEventListener('dom-ready', domLoadListener)
			}
		}
	}, [webViewRef])

	return (
		<div>
			{ isElectron && <webview ref={webViewRef} src={props.url} className={styles.webview} /> }

			{ !isElectron && <div className={styles.error}>
				<Icon icon={'fluent:error-circle-16-regular'} />
			</div> }
		</div>
	)
})

Button.displayName = 'Button'
export default Button
