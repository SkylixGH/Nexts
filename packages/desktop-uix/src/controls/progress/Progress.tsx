import React from 'react'
import styles from './progress.module.scss'

/**
 * The properties of the progress bar.
 */
export interface Props {
	/**
	 * The rendering state of the progress bar.
	 */
	mode?: 'indeterminate' | 'determinate'

	/**
	 * The progress bar percent value (0-100), this value will only be used when the mode is determinate.
	 */
	value?: number;
}

/**
 * The progress bar ref.
 */
export interface Ref {
}

const Progress = React.forwardRef<Ref, Props>((props) => {
	return (
		<div className={styles.root}>
			<div className={styles.bar} />
			<div style={{
				...(props.mode === 'determinate' ? {width: `${props.value}%`} : {}),
			}} className={
				`${styles.value} ${!props.mode || props.mode === 'indeterminate' ? styles.value_indeterminate : styles.value_determinate}`
			} />
		</div>
	)
})

Progress.displayName = 'Button'
export default Progress
