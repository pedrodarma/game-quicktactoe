/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx,html}'], // caminhos pro seu projeto
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
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
