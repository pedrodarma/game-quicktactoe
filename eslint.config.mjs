import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	// ...compat.extends('next/core-web-vitals', 'next/typescript'),
	...compat.config({
		extends: ['next/core-web-vitals', 'next/typescript'],
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'warn',
			'no-unused-vars': 'warn',
			'no-console': 'error',
			'react/no-unescaped-entities': 'warn',
			'@next/next/no-img-element': 'warn',
			'react-hooks/exhaustive-deps': 'off',
		},
		ignorePatterns: [
			// 'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'dist/**',
			'public/**',
			'next-env.d.ts',
		],
	}),
	// {
	// 	files: ['*.ts', '*.tsx'],
	// 	languageOptions: {
	// 		parser: '@typescript-eslint/parser',
	// 		parserOptions: {
	// 			tsconfigRootDir: __dirname,
	// 			project: './tsconfig.json',
	// 		},
	// 	},
	// },
	// {
	// 	ignores: [
	// 		// 'node_modules/**',
	// 		// '.next/**',
	// 		// 'out/**',
	// 		// 'build/**',
	// 		// 'dist/**',
	// 		// 'public/**',
	// 		// 'next-env.d.ts',
	// 	],
	// 	rules: {
	// 		'react/react-in-jsx-scope': 'off',
	// 		'react/jsx-uses-react': 'off',
	// 		'no-unused-vars': 'warn',
	// 		'no-console': 'off',
	// 		'react/no-unescaped-entities': 'off',
	// 		'@next/next/no-img-element': 'off',
	// 	},
	// },
];

export default eslintConfig;
