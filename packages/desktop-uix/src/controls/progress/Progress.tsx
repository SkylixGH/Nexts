import React from 'react';
import styles from './progress.module.scss';

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

	/**
	 * Whether to show the value of the progress bar when in its determinate mode.
	 */
	showValue?: boolean;
}

/**
 * The progress bar ref.
 */
export interface Ref {
}

const Progress = React.forwardRef<Ref, Props>((props) => {
	let subtractionPixels = props.showValue ? 40 : 0;

	return (
		<div className={`${styles.root} ${props.showValue && props.mode === 'determinate' ? styles._valueShown : ''}`}>
			<div className={`${styles.bar}` +
				` ${props.showValue && props.mode === 'determinate' ? styles.value_percentShown : ''}`} />
			<div style={{
				...(props.mode === 'determinate' ? {width: `calc(${(props.value ?? 0) > 100 ? 100 : props.value}% - ${subtractionPixels}px)`} : {}),
			}} className={
				`${styles.value} ${!props.mode || props.mode === 'indeterminate' ? styles.value_indeterminate : styles.value_determinate}` +
				` ${props.showValue && props.mode === 'determinate' ? styles.value_percentShown : ''}`
			} />

			{props.showValue && props.mode === 'determinate' && <div className={styles.valueNumber}>{(props.value ?? 0) > 100 ? 100 : Math.round(props.value ?? 0)}%</div>}
		</div>
	);
});

Progress.displayName = 'Button';
export default Progress;
