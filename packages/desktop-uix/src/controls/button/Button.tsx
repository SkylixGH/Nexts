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

	/**
	 * The button style mode.
	 */
	mode?: 'primary' | 'secondary' | 'outline' | 'text'
}

/**
 * The button ref.
 */
export interface Ref {
}

const Button = React.forwardRef<Ref, Props>((props) => {
	return (
		<button className={`${styles.root} ${styles[`_${props.mode}`]}`}>{props.children}</button>
	)
})

Button.displayName = 'Button'
export default Button
