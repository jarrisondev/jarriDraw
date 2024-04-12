module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:react/recommended', 'standard-with-typescript', 'plugin:prettier/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', 'prettier'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off'
	}
}
