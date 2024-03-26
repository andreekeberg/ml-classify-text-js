module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	extends: ['eslint:recommended'],
	rules: {
		quotes: ['error', 'single', { avoidEscape: true }],
		indent: 'off',
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'no-unused-vars': 'warn'
	}
}
