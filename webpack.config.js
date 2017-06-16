const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		app: './js-es6/dsg-snap-svg-list-curve.js'
	},
	output: {
		path: path.resolve(__dirname, './src'),
		filename: './js/dsg-snap-svg-list-curve.js',
		publicPath: '/public'
	},
	devServer: {
		contentBase: path.resolve(__dirname, './')
	},
	module: {
		rules: [
			{
				test: /\.(sass|scss)$/,
				use: ExtractTextPlugin.extract(
					{
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader']
					}
				)
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: { presets: ['es2015'] }
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/dsg-snap-svg-list-curve.css')
	]
};