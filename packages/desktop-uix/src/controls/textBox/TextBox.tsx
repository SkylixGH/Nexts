import React from 'react';
import styles from './TextBox.module.scss';
import {Icon} from '@iconify/react'
import Dismiss16Regular from '@iconify/icons-fluent/dismiss-16-regular'

/**
 * The properties of the text box.
 */
export interface Props {
	/**
	 * The input data type.
	 */
	type?: 'password' | 'text' | 'number';

	/**
	 * The placeholder text for when there is no text value.
	 */
	placeholder?: string;

	/**
	 * The default text value.
	 */
	defaultValue?: string;

	/**
	 * Listen for when the text box value changes.
	 */
	onChange?: (newValue: string) => void;

	/**
	 * Listen for when the input is focused.
	 */
	onFocus?: () => void;

	/**
	 * Listen for when the input is blurred.
	 */
	onBlur?: () => void;

	/**
	 * Listen for when the enter key is pressed while focused in the input.
	 */
	onEnter?: () => void;
}

/**
 * The text box ref.
 */
export interface Ref {
}

const TextBox = React.forwardRef<Ref, Props>((props) => {
	const [currentValue, setCurrentValue] = React.useState(props.defaultValue || '');
	const inputRef = React.useRef<HTMLInputElement>(null);

	return (
		<div className={styles.root}>
			{props.placeholder && currentValue.length === 0 && <span className={styles.placeholder}>{props.placeholder}</span>}

			<input ref={inputRef} type={props.type ?? 'text'} defaultValue={currentValue} onInput={(event) => {
				const value = (event.target as HTMLInputElement).value;

				setCurrentValue(value);
				if (props.onChange) props.onChange(value);
			}} />

			{currentValue.length !== 0 &&
				<button tabIndex={-1} onClick={() => {
					setCurrentValue('');

					if (inputRef.current) {
						inputRef.current.focus();
						inputRef.current.value = '';
					}

					if (props.onChange) props.onChange('');
				}}>
					<Icon icon={Dismiss16Regular} />
				</button>
			}
		</div>
	);
});

TextBox.displayName = 'Button';
export default TextBox;
