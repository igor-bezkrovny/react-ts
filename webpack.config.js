const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
	devtool: isProd ? 'hidden-source-map' : 'source-map',
	context: path.resolve('.'),
	entry: {
		js: './src/index.tsx',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'react-ts.js',
		library: 'react-ts',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(ts|tsx)$/,
				exclude: [ 'node_modules' ],
				use: [ 'ts-loader', 'source-map-loader' ]
			},
			{ test: /\.html$/, loader: 'html-loader' },
			{
				test: /\.less$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "less-loader" }
				],
			},
		]
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				// eslint-disable-line quote-props
				NODE_ENV: JSON.stringify(nodeEnv)
			}
		}),
		new HtmlWebpackPlugin(),
/*
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			output: { comments: false },
			sourceMap: true
		}),
*/
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist/'),
		compress: true,
		port: 3000,
		hot: true
	},
};
