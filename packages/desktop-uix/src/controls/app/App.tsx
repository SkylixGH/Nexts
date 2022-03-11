import React from 'react'
import styles from './App.module.scss'

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
	return (
		<div className={styles.root}>
			{props.children}
		</div>
	)
})

App.displayName = 'App'
export default App
