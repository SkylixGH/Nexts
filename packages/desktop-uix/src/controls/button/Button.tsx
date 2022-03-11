import React from 'react'
import styles from './Button.module.scss'

console.log(styles, 'e')

const Button = React.forwardRef(() => {
	return (
		<div className={styles.root}>Text</div>
	)
})

Button.displayName = 'Button'
export default Button
