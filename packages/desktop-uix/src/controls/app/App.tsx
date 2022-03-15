import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import {Icon} from '@iconify/react';
import {appWindow} from '../..';
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
}

/**
 * The app ref.
 */
export interface Ref {
}

const App = React.forwardRef<Ref, Props>((props) => {
	const isElectron = typeof window !== 'undefined' && window.process && window.process.type;

	const [title, setTitle] = useState(window.document.title);
	const [titleBarVisible, setTitleBarVisible] = useState(isElectron === 'renderer');
	const [windowMaximized, setWindowMaximized] = useState(false);
	const [reactError, setReactError] = useState<null | Error>(null);
	const [titleBarButtonCount, setTitleBarButtonCount] = useState(3);
	const [titleBarIconVisible, setTitleBarIconVisible] = useState(true);

	useEffect(() => {
		const titleListener = new MutationObserver(function() {
			setTitle(window.document.title);
		});

		if (!document.querySelector('title')) {
			const titleElement = document.createElement('title');
			document.head.appendChild(titleElement);
		}


		titleListener.observe(
			document.querySelectorAll('title')[0],
			{subtree: true, characterData: true, childList: true},
		);

		return () => {
			titleListener.disconnect();
		};
	});

	return (
		<div className={styles.root}>
			{ titleBarVisible && <div className={styles.titleBar}>
				<div className={styles.titleBar_app}>
					<div>
						<img draggable={false} src={'https://skylix.net/LogoIconDark.svg'} alt={'-'} />
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

			<div className={`${styles.content} ${titleBarVisible ? '' : styles.content_noTitleBar}`}>
				{props.children}
			</div>

			<div onClick={() => setReactError(null)} className={`${styles.errorBox} ${reactError ? '' : styles.errorBox_hide}`}>
				<Icon icon={ErrorCircle16Regular} />
			</div>

			{/* <Menu header={[ */}
			{/* 	{ */}
			{/* 		action: () => { */}
			{/* 			setTitleBarVisible(!titleBarVisible) */}
			{/* 		}, */}
			{/* 		icon: { */}
			{/* 			src: 'mdi:electron-framework', */}
			{/* 			size: 20, */}
			{/* 		}, */}
			{/* 	}, */}
			{/* 	{ */}
			{/* 		action: () => { */}
			{/* 			appWindow.minimize() */}
			{/* 		}, */}
			{/* 		icon: { */}
			{/* 			src: Minimize16Regular, */}
			{/* 			size: 17, */}
			{/* 		}, */}
			{/* 	}, */}
			{/* ]} body={[ */}
			{/* 	{ */}
			{/* 		label: 'Reload', */}
			{/* 		icon: { */}
			{/* 			src: 'fluent:refresh-16-regular', */}
			{/* 			size: 20, */}
			{/* 		}, */}
			{/* 	}, */}
			{/* 	{ */}
			{/* 		label: 'Close Current Window', */}
			{/* 		icon: { */}
			{/* 			src: 'fluent:dismiss-16-regular', */}
			{/* 		}, */}
			{/* 	}, */}
			{/* ]}/> */}
		</div>
	);
});

App.displayName = 'App';
export default App;
