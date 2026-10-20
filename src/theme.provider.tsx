'use client';

import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

export type ColorTheme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME: ColorTheme = 'dark';

/**
 * Runs before React hydrates (inlined in <head>) so the saved theme is
 * applied on the first paint, without a flash of the default theme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var c=t==='light'?'light':'dark';var r=document.documentElement;r.classList.remove('dark','light');r.classList.add(c);}catch(e){}})();`;

interface ThemeContextType {
	theme: ColorTheme;
	setTheme: (theme: ColorTheme) => void;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function _applyTheme(theme: ColorTheme) {
	const root = document.documentElement;
	root.classList.remove('dark', 'light');
	root.classList.add(theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<ColorTheme>(DEFAULT_THEME);

	useEffect(() => {
		const isLight = document.documentElement.classList.contains('light');
		setThemeState(isLight ? 'light' : 'dark');
	}, []);

	const setTheme = useCallback((next: ColorTheme) => {
		setThemeState(next);
		_applyTheme(next);
		try {
			localStorage.setItem(THEME_STORAGE_KEY, next);
		} catch {}
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}, [theme, setTheme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (context === undefined) {
		throw new Error("You must use 'useTheme' within a 'ThemeProvider'");
	}

	return context;
}
