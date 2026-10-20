import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// eslint-config-next 16 ships native flat configs (no FlatCompat needed).
const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'warn',
			'no-unused-vars': 'warn',
			'no-console': 'error',
			'react/no-unescaped-entities': 'warn',
			'@next/next/no-img-element': 'warn',
			'react-hooks/exhaustive-deps': 'off',
			// New React Compiler rules (eslint-plugin-react-hooks 7, via
			// eslint-config-next 16). They flag the existing provider/state
			// pattern (effects calling functions declared further down), so
			// they warn for now instead of failing lint.
			'react-hooks/immutability': 'warn',
			'react-hooks/use-memo': 'warn',
		},
	},
	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'dist/**',
		'public/**',
		'next-env.d.ts',
	]),
]);

export default eslintConfig;
