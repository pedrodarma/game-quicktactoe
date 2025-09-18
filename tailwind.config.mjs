/** @type {import('tailwindcss').Config} */
export const tailwindcss = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,html}',
		'./@design_system/**/*.{js,ts,jsx,tsx,html}',
	], // caminhos pro seu projeto
	theme: {
		extend: {
			colors: {
				background: 'red',
				foreground: 'var(--foreground)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'Arial', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],
			},
		},
	},
	darkMode: 'media', // ou 'class' se quiser controlar manualmente
};
export default tailwindcss;
