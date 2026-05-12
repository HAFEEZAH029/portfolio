import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type ThemeMode = 'dark' | 'light';

export const theme = writable<ThemeMode>('dark');

export const toggleTheme = () => {
	theme.update((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
};

if (browser) {
	theme.subscribe((currentTheme) => {
		document.documentElement.dataset.theme = currentTheme;
	});
}
