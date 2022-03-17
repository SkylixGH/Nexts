import React, {useEffect} from 'react';
import styles from './NavigationView.module.scss';

/**
 * The properties of the navigation view.
 */
export interface Props {
	/**
	 * The view contents.
	 */
	children: JSX.Element | JSX.Element[];

	sideRail?: boolean;

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
				{ props.sideRail && <div className={styles.sideBar_rail}>

				</div> }

				{ props.sideBar && <div className={styles.sideBar_body}>

				</div> }
			</div>

			<div className={styles.content}>
				<div className={`${styles.content_body} ${!props.metaBar ? styles.content_bodyMetaBarHide : ''}`}>
					{ props.children }
				</div>

				{props.metaBar && <div className={styles.content_metaBar}>
					<button>Hello</button>
				</div>}
			</div>
		</div>
	);
});

NavigationView.displayName = 'NavigationView';
export default NavigationView;
