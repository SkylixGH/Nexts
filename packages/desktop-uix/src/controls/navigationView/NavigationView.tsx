import {Icon, IconifyIcon} from '@iconify/react';
import React, {useEffect, useRef} from 'react';
import {useRouter} from '../..';
import styles from './NavigationView.module.scss';
import URLPattern from 'url-pattern';

/**
 * A single side rail item.
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
	 * The button action, or the router URL.
	 */
	action: () => void | string;

	/**
	 * A function that is triggered to render a context menu.
	 */
	contextMenu?: () => void;

	/**
	 * If the current item is active, or the URL to trigger the URL to be active.
	 */
	active?: boolean | string;
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

	/**
	 * The sidebar content.
	 */
	sideBar?: JSX.Element;

	/**
	 * The meta bar items.
	 */
	metaBar?: boolean;

	/**
	 * The app router.
	 */
	router: ReturnType<typeof useRouter>;
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
						let isActive = false;

						if (button.active === true) {
							isActive = true;
						} else if (new URLPattern(button.active || '').match(window.location.pathname)) {
							isActive = true;
						}

						return (
							<button onContextMenu={(event) => {
								event.preventDefault();

								if (button.contextMenu) {
									button.contextMenu();
								}
							}} onClick={() => {
								if (typeof button.action === 'function') {
									button.action();
								} else {
									props.router.navigate(button.action);
								}
							}} key={`sideRail_button_${index}`} className={`${styles.sideBar_railButton} ${isActive ? styles.sideBar_railButtonActive : ''}`}>
								<svg className={styles.sideBar_railButtonCursor} width={3} height={15}>
									<rect ry={2} fill={'var(--accent1)'} width={3} height={15}/>
								</svg>

								{button.icon.type === 'image' ? <div className={styles.sideBar_railButtonImage}>
									<img alt={''} src={button.icon.src} />
								</div> :
									<Icon icon={button.icon.src} style={{
										fontSize: button.icon.size || 16,
									}} />}
							</button>
						);
					})}
				</div> }

				{ props.sideBar && <div className={styles.sideBar_body}>
					{props.sideBar}
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
