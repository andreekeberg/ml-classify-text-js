require('core-js/stable')
require('regenerator-runtime/runtime')

const path = require('path')

module.exports = {
	entry: {
		'index': './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'index.js',
		libraryTarget: 'umd',
		globalObject: 'this'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							['@babel/plugin-transform-runtime', {
								corejs: 3,
							}]
						],
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}
