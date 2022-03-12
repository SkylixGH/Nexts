import React from 'react'
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
}

/**
 * The button ref.
 */
export interface Ref {
}

const Button = React.forwardRef<Ref, Props>((props) => {
	const isElectron = typeof window !== 'undefined' && window.process && window.process.type

	return (
		<div>
			{ isElectron && <webview src={props.url} className={styles.webview} /> }

			{ !isElectron && <div className={styles.error}>
				<Icon icon={'fluent:error-circle-16-regular'} />
			</div> }
		</div>
	)
})

Button.displayName = 'Button'
export default Button
