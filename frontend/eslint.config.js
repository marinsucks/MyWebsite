import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	{
	ignores: [
	'dist/**',
	'dist_v1/**',
	'node_modules/**',
	'coverage/**',
	'build/**',
	'tailwind.config.js',
	'postcss.config.js',
	'vite.config.ts',
	],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: './tsconfig.json',
			},
		},
	},
];