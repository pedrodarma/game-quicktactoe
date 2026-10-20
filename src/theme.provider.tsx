'use client';

import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useSyncExternalStore,
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

// The class on <html> is the source of truth; React subscribes to it.
const _listeners = new Set<() => void>();

function _subscribe(listener: () => void) {
	_listeners.add(listener);
	return () => {
		_listeners.delete(listener);
	};
}

function _getSnapshot(): ColorTheme {
	return document.documentElement.classList.contains('light')
		? 'light'
		: 'dark';
}

function _getServerSnapshot(): ColorTheme {
	return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const theme = useSyncExternalStore(
		_subscribe,
		_getSnapshot,
		_getServerSnapshot,
	);

	const setTheme = useCallback((next: ColorTheme) => {
		const root = document.documentElement;
		root.classList.remove('dark', 'light');
		root.classList.add(next);
		try {
			localStorage.setItem(THEME_STORAGE_KEY, next);
		} catch {}
		_listeners.forEach((listener) => listener());
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
