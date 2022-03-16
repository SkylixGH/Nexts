import {Icon, IconifyIcon} from '@iconify/react';
import React, {useEffect} from 'react';
import styles from './Menu.module.scss';

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
		src: string | IconifyIcon | any;

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
	 * If the menu is open.
	 */
	show: boolean;

	/**
	 * The menu position.
	 */
	position: {
		/**
		 * The X axis position.
		 */
		x: number;

		/**
		 * The Y axis position.
		 */
		y: number;
	}

	/**
	 * Listen for when the mouse is over the menu.
	 */
	onMouseOver: () => void;

	/**
	 * Listen for when the mouse leaves the context menu.
	 */
	onMouseLeave: () => void;

	/**
	 * Listen for when the menu demands to be closed.
	 */
	onCommandHide: () => void;

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

		/**
		 * The click action.
		 */
		action: () => void;

		/**
		 * Whether the button is disabled.
		 */
		disabled?: boolean;
	}[];
}

const Menu = (props: Props) => {
	const menuRef = React.useRef<HTMLDivElement>(null);
	const [xPos, setXPos] = React.useState(props.position.x);
	const [yPos, setYPos] = React.useState(props.position.y);

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
		);
	};

	const renderIconButtons = (buttons: IconButton[]) => {
		const resultJsx = [] as JSX.Element[];

		buttons.forEach((button) => {
			resultJsx.push(
				<button className={styles.iconButton} onClick={() => {
					if (props.onCommandHide) {
						props.onCommandHide();
					}

					button.action();
				}}>
					{renderButtonIcon(button.icon)}
				</button>,
			);
		});

		return resultJsx;
	};

	const calculatePosition = () => {
		let xPosTemp = props.position.x;
		let yPosTemp = props.position.y;

		const windowHeight = window.innerHeight;
		const windowWidth = window.innerWidth;

		const menuHeight = menuRef?.current!.offsetHeight;
		const menuWidth = menuRef?.current!.offsetWidth;

		if ((yPosTemp + menuHeight) > windowHeight - 10) {
			yPosTemp = windowHeight - 10 - menuHeight;
		}

		if ((xPosTemp + menuWidth) > windowWidth - 10) {
			xPosTemp = windowWidth - 10 - menuWidth;
		}

		setYPos(yPosTemp);
		setXPos(xPosTemp);
	};

	useEffect(() => {
		calculatePosition();

		const windowResizeListener = () => {
			props.onCommandHide();
		};

		window.addEventListener('resize', windowResizeListener);

		return () => {
			window.removeEventListener('resize', windowResizeListener);
		};
	});

	return (
		<div onMouseEnter={() => props.onMouseOver()} onMouseLeave={() => props.onMouseLeave()} ref={menuRef} className={`${styles.root} ${props.show ? '' : styles._hide}`} style={{
			top: `${yPos}px`,
			left: `${xPos}px`,
		}}>
			{ props.header && props.header.length > 0 && <div className={styles.header}>
				{renderIconButtons(props.header)}
			</div> }

			<div className={styles.body}>
				{props.body.map((button) => {
					return (
						<button onClick={() => {
							if (props.onCommandHide) {
								props.onCommandHide();
							}

							button.action();
						}} className={`${styles.body_button} ${button.disabled ? styles.body_buttonDisabled : ''}`}>
							<div className={styles.body_buttonIcon}>
								{button.icon && renderButtonIcon(button.icon)}
							</div>

							<div className={styles.body_buttonLabel}>
								{button.label}
							</div>
						</button>
					);
				})}
			</div>

			{ props.footer && props.footer.length > 0 && <div className={styles.footer}>
				{renderIconButtons(props.footer)}
			</div> }
		</div>
	);
};

export default Menu;
