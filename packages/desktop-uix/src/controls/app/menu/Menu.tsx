import {Icon} from '@iconify/react'
import React from 'react'
import styles from './Menu.module.scss'

/**
 * A single icon button.
 */
export interface IconButton {
	/**
	 * The click action.
	 */
	action: () => void;

	/**
	 * The icon.
	 */
	icon: {
		/**
		 * The source of the icon.
		 */
		src: string;

		/**
		 * The type of the icon.
		 */
		type?: 'icon' | 'image' | 'char';
	},
}

/**
 * Menu props.
 */
export interface Props {
	/**
	 * The footer buttons.
	 */
	footer?: IconButton[];

	/**
	 * The header buttons.
	 */
	header?: IconButton[];
}

const Menu = (props: Props) => {
	const renderIconButtons = (buttons: IconButton[]) => {
		const resultJsx = [] as JSX.Element[]

		buttons.forEach((button) => {
			resultJsx.push(
				<button className={styles.iconButton} onClick={() => button.action()}>
					{
						button.icon.type === 'icon' || !button.icon.type ?
							<Icon icon={button.icon.src} /> :
							(
								button.icon.type === 'image' ?
									(
										<div className={styles.iconButton_imageWrapper}>
											<img draggable={false} src={button.icon.src} alt={''} />
										</div>
									) :
									<span className={styles.iconButton_charWrapper}>{button.icon.src}</span>
							)
					}
				</button>,
			)
		})

		return resultJsx
	}

	return (
		<div className={styles.root}>
			{ props.header && props.header.length > 0 && <div className={styles.header}>
				{renderIconButtons(props.header)}
			</div> }

			<div className={styles.body}>

			</div>

			{ props.footer && props.footer.length > 0 && <div className={styles.footer}>
				{renderIconButtons(props.footer)}
			</div> }
		</div>
	)
}

export default Menu
