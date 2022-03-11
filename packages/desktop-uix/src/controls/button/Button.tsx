import React from 'react'
import styles from './Button.module.scss'

/**
 * The properties of the button.
 */
export interface Props {
	/**
	 * The text to display in the button.
	 */
	children: string
}

/**
 * The button ref.
 */
export interface Ref {
}

const Button = React.forwardRef<Ref, Props>((props) => {
	return (
		<button className={styles.root}>{props.children}</button>
	)
})

Button.displayName = 'Button'
export default Button
