import {Icon, IconifyIcon} from '@iconify/react'
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
		src: string | IconifyIcon;

		/**
		 * The type of the icon.
		 */
		type?: 'icon' | 'image' | 'char';

		/**
		 * The side in number of pixels of the icon.
		 */
		size?: number;
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

	/**
	 * The menu items.
	 */
	body: {
		/**
		 * The icon for the button.
		 */
		icon?: IconButton['icon'];

		/**
		 * The label for the button.
		 */
		label: string;
	}[];
}

const Menu = (props: Props) => {
	const renderButtonIcon = (icon: IconButton['icon']) => {
		return (
			icon.type === 'icon' || !icon.type ?
				<Icon style={{
					fontSize: typeof icon.size !== 'undefined' ? `${icon.size}px` : '16px',
				}} icon={icon.src} /> :
				(
					icon.type === 'image' ?
						(
							<div className={styles.iconButton_imageWrapper}>
								<img draggable={false} src={typeof icon.src === 'string' ? icon.src : ''} alt={''} />
							</div>
						) :
						<span style={{
							fontSize: typeof icon.size !== 'undefined' ? `${icon.size}px` : '16px',
						}} className={styles.iconButton_charWrapper}>{icon.src}</span>
				)
		)
	}

	const renderIconButtons = (buttons: IconButton[]) => {
		const resultJsx = [] as JSX.Element[]

		buttons.forEach((button) => {
			resultJsx.push(
				<button className={styles.iconButton} onClick={() => button.action()}>
					{renderButtonIcon(button.icon)}
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
				{props.body.map((button) => {
					return (
						<button>
							<div>
								{button.icon && renderButtonIcon(button.icon)}
							</div>
						</button>
					)
				})}
			</div>

			{ props.footer && props.footer.length > 0 && <div className={styles.footer}>
				{renderIconButtons(props.footer)}
			</div> }
		</div>
	)
}

export default Menu
