import {Icon, IconifyIcon} from '@iconify/react';
import React, {useEffect} from 'react';
import styles from './NavigationView.module.scss';

/**
 *
 */
interface SideRailItem {
	/**
	 * The button icon.
	 */
	icon: {
		/**
		 * The icon source.
		 */
		src: string | IconifyIcon | any;

		/**
		 * The icon source type.
		 */
		type?: 'icon' | 'image';

		/**
		 * The icon size that applies to iconify icons.
		 */
		size?: number;
	}

	/**
	 * The button action.
	 */
	action: () => void;

	/**
	 * A function that is triggered to render a context menu.
	 */
	contextMenu?: () => void;

	/**
	 * If the current item is active.
	 */
	active?: boolean;
}

/**
 * The properties of the navigation view.
 */
export interface Props {
	/**
	 * The view contents.
	 */
	children: JSX.Element | JSX.Element[];

	/**
	 * The side rail navigation items.
	 */
	sideRail?: SideRailItem[];

	sideBar?: boolean;

	metaBar?: boolean;
}

/**
 * The navigation view ref.
 */
export interface Ref {
}

const NavigationView = React.forwardRef<Ref, Props>((props) => {
	return (
		<div className={styles.root}>
			<div style={{
				width: `${(props.sideRail ? 60 : 0) + (props.sideBar ? 300 : 0)}px`,
			}} className={styles.sideBar}>
				{ props.sideRail && props.sideRail.length > 0 && <div className={styles.sideBar_rail}>
					{props.sideRail.map((button, index) => {
						return (
							<button onContextMenu={(event) => {
								event.preventDefault();

								if (button.contextMenu) {
									button.contextMenu();
								}
							}} onClick={() => {
								if (button.action) {
									button.action();
								}
							}} key={`sideRail_button_${index}`} className={`${styles.sideBar_railButton} ${button.active ? styles.sideBar_railButtonActive : ''}`}>
								<svg className={styles.sideBar_railButtonCursor} width={3} height={15}>
									<rect ry={2} fill={'var(--accent1)'} width={3} height={15}/>
								</svg>

								{button.icon.type === 'image' ? <div className={styles.sideBar_railButtonImage}>
									<Icon icon={button.icon.src} />
								</div> :
									<Icon icon={button.icon.src} style={{
										fontSize: button.icon.size || 16,
									}} />}
							</button>
						);
					})}
				</div> }

				{ props.sideBar && <div className={styles.sideBar_body}>

				</div> }
			</div>

			<div className={styles.content}>
				<div className={`${styles.content_body} ${!props.metaBar ? styles.content_bodyMetaBarHide : ''}`}>
					{ props.children }
				</div>

				{props.metaBar && <div className={styles.content_metaBar}>
					<div>
						<button>Hello</button>
						<button>Hello</button>
						<button>Hello</button>
					</div>

					<div>
						<button>Hello</button>
						<button>Hello</button>
						<button>Hello</button>
					</div>
				</div>}
			</div>
		</div>
	);
});

NavigationView.displayName = 'NavigationView';
export default NavigationView;
