import {ThemeProperties} from '..'

/**
 * A Nexts theme properties structure.
 */
export interface NextsControlsTheme extends ThemeProperties {
	/**
	 * Layer 1 solid.
	 */
	layerSolid1: string;

	/**
	 * Layer 2 solid.
	 */
	layerSolid2: string;

	/**
	 * Layer 3 solid.
	 */
	layerSolid3: string;

	/**
	 * Layer 4 solid.
	 */
	layerSolid4: string;

	/**
	 * Text 1.
	 */
	text1: string;

	/**
	 * Text 2.
	 */
	text2: string;

	/**
	 * Text 3.
	 */
	text3: string;

	/**
	 * Text 4.
	 */
	text4: string;

	/**
	 * Subtle 1.
	 */
	subtle1: string;

	/**
	 * Subtle 2.
	 */
	subtle2: string;

	/**
	 * Subtle 3.
	 */
	subtle3: string;

	/**
	 * Subtle 4.
	 */
	subtle4: string;

	/**
	 * Subtle 1 lighter.
	 */
	subtleLighter1: string;

	/**
	 * Subtle 2 lighter.
	 */
	subtleLighter2: string;

	/**
	 * Subtle 3 lighter.
	 */
	subtleLighter3: string;

	/**
	 * Subtle 4 lighter.
	 */
	subtleLighter4: string;

	/**
	 * Subtle 1 darker.
	 */
	subtleDarker1: string;

	/**
	 * Subtle 2 darker.
	 */
	subtleDarker2: string;

	/**
	 * Subtle 3 darker.
	 */
	subtleDarker3: string;

	/**
	 * Subtle 4 darker.
	 */
	subtleDarker4: string;

	/**
	 * Accent 1.
	 */
	accent1: string;

	/**
	 * Accent 2.
	 */
	accent2: string;

	/**
	 * Accent 1 text.
	 */
	accentText1: string;

	/**
	 * Accent 2 text.
	 */
	accentText2: string;

	/**
	 * Success 1.
	 */
	success1: string;

	/**
	 * Success 2.
	 */
	success2: string;

	/**
	 * Error 1 text.
	 */
	error1: string;

	/**
	 * Error 2 text.
	 */
	error2: string;

	/**
	 * Warning 1 text.
	 */
	warning1: string;

	/**
	 * Warning 2 text.
	 */
	warning2: string;
}

export const darkTheme: NextsControlsTheme = {
	layerSolid1: '#121212',
	layerSolid2: '#181818',
	layerSolid3: '#232323',
	layerSolid4: '#272727',

	text1: '#ffffff',
	text2: '#c3c3c3',
	text3: '#999999',
	text4: '#555555',

	subtle1: 'rgba(255, 255, 255, 5%)',
	subtle2: 'rgba(255, 255, 255, 10%)',
	subtle3: 'rgba(255, 255, 255, 20%)',
	subtle4: 'rgba(255, 255, 255, 30%)',

	subtleLighter1: 'rgba(255, 255, 255, 5%)',
	subtleLighter2: 'rgba(255, 255, 255, 10%)',
	subtleLighter3: 'rgba(255, 255, 255, 20%)',
	subtleLighter4: 'rgba(255, 255, 255, 30%)',

	subtleDarker1: 'rgba(0, 0, 0, 5%)',
	subtleDarker2: 'rgba(0, 0, 0, 10%)',
	subtleDarker3: 'rgba(0, 0, 0, 20%)',
	subtleDarker4: 'rgba(0, 0, 0, 30%)',

	accent1: '#ffffff',
	accent2: '#999999',

	accentText1: '#121212',
	accentText2: 'rgba(18, 18, 18, 40%)',

	success1: '#50ffab',
	success2: 'rgba(80, 255, 171, 40%)',

	error1: '#ff5555',
	error2: 'rgba(255, 85, 85, 40%)',

	warning1: '#ffff55',
	warning2: 'rgba(255, 255, 85, 40%)',
}
