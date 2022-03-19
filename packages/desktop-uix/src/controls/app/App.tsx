import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import {Icon} from '@iconify/react';
import {useMenu, UseMenuSettings, useAppWindow, useThemeType} from '../..';
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

	/**
	 * The flow direction of the app body.
	 */
	flowDirection?: 'row' | 'column';
}

/**
 * The app ref.
 */
export interface Ref {
}

let currentMousePosition: {x: number, y: number} = {x: 0, y: 0};
const setCurrentMousePosition = (data: typeof currentMousePosition) => {
	currentMousePosition = data;
};

const App = React.forwardRef<Ref, Props>((props) => {
	const isElectron = typeof window !== 'undefined' && window.process && window.process.type;
	const themeType = useThemeType();
	const appWindow = useAppWindow();
	const menu = useMenu();
	const [title, setTitle] = useState(window.document.title);
	const [titleBarVisible, setTitleBarVisible] = useState(isElectron === 'renderer' && appWindow.currentWindowState !== 'fullScreen');
	const [windowMaximized, setWindowMaximized] = useState(appWindow.currentWindowState === 'maximized');
	const [reactError, setReactError] = useState<null | Error>(null);
	const [titleBarButtonCount, setTitleBarButtonCount] = useState(3);
	const [titleBarIconVisible, setTitleBarIconVisible] = useState(typeof process !== 'undefined' ? !!process.env.NEXTS_DEV_ICON_FRAME : false);
	const [contextMenuVisible, setContextMenuVisible] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
	const [mouseOverContextMenu, setMouseOverContextMenu] = useState(false);
	const [contextMenuSettings, setContextMenuSettings] = useState<UseMenuSettings>();

	useEffect(() => {
		const titleListener = new MutationObserver(function() {
			setTitle(window.document.title);
		});

		const menuOpenListener = (menuData: UseMenuSettings) => {
			setContextMenuPosition(currentMousePosition);

			setContextMenuSettings(menuData);
			setContextMenuVisible(true);
		};

		const windowMouseMoveListener = (event: MouseEvent) => {
			setCurrentMousePosition({x: event.clientX, y: event.clientY});
		};

		const windowMaximizedListener = () => {
			setWindowMaximized(true);
		};

		const windowUnMaximizeListener = () => {
			setWindowMaximized(false);
		};

		const windowFullscreenListener = () => {
			setTitleBarVisible(false);
		};

		const windowUnFullscreenListener = () => {
			setTitleBarVisible(true);
		};

		const windowClickListener = () => {
			if (!mouseOverContextMenu && contextMenuVisible) {
				setContextMenuVisible(false);
			}
		};

		if (!document.querySelector('title')) {
			const titleElement = document.createElement('title');
			document.head.appendChild(titleElement);
		}

		menu.events.addListener('open', menuOpenListener);
		document.addEventListener('click', windowClickListener);
		document.addEventListener('mousemove', (event: MouseEvent) => {
			setCurrentMousePosition({x: event.clientX, y: event.clientY});
		});

		appWindow.events.addListener('maximize', windowMaximizedListener);
		appWindow.events.addListener('fullScreen', windowFullscreenListener);
		appWindow.events.addListener('unFullScreen', windowUnFullscreenListener);
		appWindow.events.addListener('unMaximize', windowUnMaximizeListener);

		titleListener.observe(
			document.querySelectorAll('title')[0],
			{subtree: true, characterData: true, childList: true},
		);

		return () => {
			titleListener.disconnect();

			menu.events.removeListener('open', menuOpenListener);
			document.removeEventListener('click', windowClickListener);
			document.removeEventListener('mousemove', windowMouseMoveListener);

			appWindow.events.removeListener('maximize', windowMaximizedListener);
			appWindow.events.removeListener('fullScreen', windowFullscreenListener);
			appWindow.events.removeListener('unFullScreen', windowUnFullscreenListener);
			appWindow.events.removeListener('unMaximize', windowUnMaximizeListener);
		};
	});

	const appProcess = typeof process !== 'undefined' ? process : null;

	const AppIcon = () => <img draggable={false} src={appProcess?.env.NEXTS_DEV_ICON_LIGHT_FRAME || appProcess?.env.NEXTS_DEV_ICON_DARK_FRAME ?
		(themeType === 'dark' ? process.env.NEXTS_DEV_ICON_DARK_FRAME : process.env.NEXTS_DEV_ICON_LIGHT_FRAME) :
		'https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg'} alt={'-'}
	/>;

	return (
		<div className={styles.root}>
			{ titleBarVisible && <div className={styles.titleBar}>
				<div className={styles.titleBar_app}>
					<div onClick={() => {
						menu.open({
							body: [
								{
									label: 'Restore',
									action: () => {
										appWindow.restore();
										setWindowMaximized(false);
									},
									icon: {
										src: Restore16Regular,
									},
									disabled: !windowMaximized,
								},
								{
									label: 'Minimize',
									action: () => {
										appWindow.minimize();
									},
									icon: {
										src: Minimize16Regular,
										size: 17,
									},
								},
								{
									label: 'Maximize',
									action: () => {
										appWindow.maximize();
										setWindowMaximized(true);
									},
									icon: {
										src: Maximize16Regular,
									},
									disabled: windowMaximized,
								},
								{
									label: 'Close',
									action: () => {
										appWindow.close();
									},
									icon: {
										src: Dismiss16Regular,
									},
								},
							],
						});
					}}>
						<AppIcon />
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

					<button onClick={() => {
						if (windowMaximized) {
							appWindow.restore();
							setWindowMaximized(false);
						} else {
							appWindow.maximize();
							setWindowMaximized(true);
						}
					}}>
						<Icon icon={windowMaximized ? Restore16Regular : Maximize16Regular} />
					</button>

					<button onClick={() => appWindow.close()} className={styles.titleBar_buttonsClose}>
						<Icon icon={Dismiss16Regular} />
					</button>
				</div>
			</div> }

			<div className={`${styles.content} ${props.center ? styles.content_center : ''} ${titleBarVisible ? '' : styles.content_noTitleBar}`} style={{
				...(props.center && props.flowDirection === 'row' ? {
					flexDirection: 'row',
				} : {}),
			}}>
				{props.children}
			</div>

			<div onClick={() => setReactError(null)} className={`${styles.errorBox} ${reactError ? '' : styles.errorBox_hide}`}>
				<Icon icon={ErrorCircle16Regular} />
			</div>

			<div className={`${styles.loadingFrame} ${titleBarVisible ? styles.loadingFrame_titleBarVisible : ''}`}>
				<AppIcon />
			</div>

			<Menu onCommandHide={() => {
				setContextMenuVisible(false);
			}} onMouseLeave={() => setMouseOverContextMenu(false)} onMouseOver={() => setMouseOverContextMenu(true)} show={contextMenuVisible} position={contextMenuPosition}
			header={contextMenuSettings?.header ?? undefined} footer={contextMenuSettings?.footer ?? undefined} body={contextMenuSettings?.body ?? []} />
		</div>
	);
});

App.displayName = 'App';
export default App;
