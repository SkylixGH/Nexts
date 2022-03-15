import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import {Icon} from '@iconify/react';
import {appWindow, menu, MenuSettings, useThemeType} from '../..';
import Menu from './menu/Menu';
import Maximize16Regular from '@iconify/icons-fluent/maximize-16-regular';
import Restore16Regular from '@iconify/icons-fluent/restore-16-regular';
import Minimize16Regular from '@iconify/icons-fluent/minimize-16-regular';
import Dismiss16Regular from '@iconify/icons-fluent/dismiss-16-regular';
import ErrorCircle16Regular from '@iconify/icons-fluent/error-circle-16-regular';

/**
 * The properties of the app.
 */
export interface Props {
	/**
	 * The app view layer.
	 */
	children: JSX.Element | JSX.Element[];

	/**
	 * Center the body view contents.
	 */
	center?: boolean;
}

/**
 * The app ref.
 */
export interface Ref {
}

const App = React.forwardRef<Ref, Props>((props) => {
	const isElectron = typeof window !== 'undefined' && window.process && window.process.type;
	const themeType = useThemeType();
	const [title, setTitle] = useState(window.document.title);
	const [titleBarVisible, setTitleBarVisible] = useState(isElectron === 'renderer');
	const [windowMaximized, setWindowMaximized] = useState(false);
	const [reactError, setReactError] = useState<null | Error>(null);
	const [titleBarButtonCount, setTitleBarButtonCount] = useState(3);
	const [titleBarIconVisible, setTitleBarIconVisible] = useState(typeof process !== 'undefined' ? !!process.env.NEXTS_DEV_ICON_FRAME : false);
	const [contextMenuVisible, setContextMenuVisible] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
	const [mouseOverContextMenu, setMouseOverContextMenu] = useState(false);
	const [contextMenuSettings, setContextMenuSettings] = useState<MenuSettings>();

	useEffect(() => {
		const titleListener = new MutationObserver(function() {
			setTitle(window.document.title);
		});

		const menuOpenListener = (menuData: MenuSettings) => {
			setContextMenuSettings(menuData);
			setContextMenuVisible(true);
		};

		const windowClickListener = () => {
			if (!mouseOverContextMenu) {
				setContextMenuVisible(false);
			}
		};

		if (!document.querySelector('title')) {
			const titleElement = document.createElement('title');
			document.head.appendChild(titleElement);
		}

		document.addEventListener('click', windowClickListener);
		menu.addListener('open', menuOpenListener);

		titleListener.observe(
			document.querySelectorAll('title')[0],
			{subtree: true, characterData: true, childList: true},
		);

		return () => {
			titleListener.disconnect();
			document.removeEventListener('click', windowClickListener);
			menu.removeListener('open', menuOpenListener);
		};
	});

	return (
		<div className={styles.root} onDoubleClick={(event) => {
			setContextMenuPosition({x: event.clientX, y: event.clientY});
			menu.open({
				body: [
					{
						label: 'Reload Window (Ctrl+R)',
						icon: {
							src: 'mdi:reload'
						}
					},
					{
						label: 'Restart Application (Ctrl+Shift+R)',
						icon: {
							src: 'mdi:restart'
						}
					}
				]
			})
		}}>
			{ titleBarVisible && <div className={styles.titleBar}>
				<div className={styles.titleBar_app}>
					<div>
						<img draggable={false} src={process.env.NEXTS_DEV_ICON_LIGHT_FRAME || process.env.NEXTS_DEV_ICON_DARK_FRAME ?
							(themeType === 'dark' ? process.env.NEXTS_DEV_ICON_DARK_FRAME : process.env.NEXTS_DEV_ICON_LIGHT_FRAME) :
							'https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg'} alt={'-'}
						/>
					</div>

					<span style={{
						maxWidth: `calc(100vw - ${(titleBarButtonCount * 45) + (titleBarIconVisible ? 40 : 0)}px)`,
					}} className={styles.titleBar_appTitle}>{title}</span>
				</div>

				<div className={styles.titleBar_buttons}>
					<button onClick={() => appWindow.minimize()}>
						<Icon style={{
							fontSize: '17px',
						}} icon={Minimize16Regular} />
					</button>

					<button onClick={() => setWindowMaximized(!windowMaximized)}>
						<Icon icon={windowMaximized ? Restore16Regular : Maximize16Regular} />
					</button>

					<button onClick={() => appWindow.close()} className={styles.titleBar_buttonsClose}>
						<Icon icon={Dismiss16Regular} />
					</button>
				</div>
			</div> }

			<div className={`${styles.content} ${props.center ? styles.content_center : ''} ${titleBarVisible ? '' : styles.content_noTitleBar}`}>
				{props.children}
			</div>

			<div onClick={() => setReactError(null)} className={`${styles.errorBox} ${reactError ? '' : styles.errorBox_hide}`}>
				<Icon icon={ErrorCircle16Regular} />
			</div>

			<Menu onMouseLeave={() => setMouseOverContextMenu(false)} onMouseOver={() => setMouseOverContextMenu(true)} show={contextMenuVisible} position={contextMenuPosition}
				header={contextMenuSettings?.header ?? undefined} footer={contextMenuSettings?.footer ?? undefined} body={contextMenuSettings?.body ?? []} />
		</div>
	);
});

App.displayName = 'App';
export default App;
