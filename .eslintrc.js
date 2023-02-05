module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
		jest: true
	},
	extends: ['eslint:recommended'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	rules: {
		quotes: ['error', 'single', { avoidEscape: true }],
		semi: ['error', 'never'],
		indent: 'off',
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'linebreak-style': ['error', 'unix'],
		'no-unused-vars': 'warn'
	}
}
