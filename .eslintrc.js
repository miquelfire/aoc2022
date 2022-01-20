module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	env: {
		'node': true
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
	],
	'rules': {
		'indent': [
			'error',
			'tab',
			{
				SwitchCase: 1
			}
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
