import {useEffect, useState} from 'react'
import {themeManager} from '../..'

/**
 * A React hook to get the current theme type.
 * @returns The current theme type.
 */
export default function useThemeType() {
	const [themeType, setThemeType] = useState<'light' | 'dark'>(themeManager.getCurrentTheme().type)

	const themeChangeListener = () => {
		setThemeType(themeManager.getCurrentTheme().type)
	}

	useEffect(() => {
		themeManager.on('change', themeChangeListener)

		return () => {
			themeManager.removeListener('change', themeChangeListener)
		}
	})

	return themeType
}
