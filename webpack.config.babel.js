import { resolve } from 'path';
import {
	DefinePlugin,	//允许在编译时配置全局常量
	EnvironmentPlugin, //使用DefinePluginon process.env键的 速记
	IgnorePlugin,  // 从捆绑中排除某些模块
	optimize //在优化阶段开始时触发
} from 'webpack';
import WXAppWebpackPlugin, { Targets } from 'wxapp-webpack-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';

var constant = require('./configs/constants')

const { NODE_ENV, LINT , API_HOST} = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = !!LINT && LINT !== 'false';
const srcDir = resolve('src');


const relativeFileLoader = (ext = '[ext]') => ({
	loader: 'file-loader',
	options: {
		useRelativePath: true,
		name: `[name].${ext}`,
		context: srcDir
	}
});

export default (env = {}) => {
	const min = env.min;
	const target = env.target || 'Wechat';
	// const isWechat = env.target !== 'Alipay';
	// const isAlipay = !isWechat;
	return {
		entry: {
			app: [
				`es6-promise/dist/es6-promise.auto${isDev ? '.min' : ''}.js`,
				'./src/app.js'
			]
		},
		output: {
			filename: '[name].js',
			publicPath: '/',
			path: resolve('dist')
		},
		target: Targets[target],
		module: {
			rules: [
				{
					test: /\.js$/,
					include: /src/,
					exclude: /node_modules/,
					use: ['babel-loader',shouldLint && 'eslint-loader'].filter(Boolean)
				},
				{
					test: /\.wxs$/,
					include: /src/,
					exclude: /node_modules/,
					use: [
						relativeFileLoader(),
						'babel-loader',
						shouldLint && 'eslint-loader'
					].filter(Boolean)
				},
				{
					test: /\.styl$/,
					include: /src/,
					use: [
						relativeFileLoader('wxss'),
						{
							loader: 'stylus-loader',
							options: {
								includePaths: [resolve('src', 'styles'), resolve('src')]
							}
						}
					]
				},
				{
					test: /\.(json|png|jpg|gif|wxss)$/,
					include: /src/,
					use: relativeFileLoader()
				},
				{
					test: /\.wxml$/,
					include: resolve('src'),
					use: [
						relativeFileLoader('wxml'),
						{
							loader: 'wxml-loader',
							options: {
								root: resolve('src'),
								enforceRelativePath: true
							}
						}
					]
				}
			]
		},
		plugins: [
			new EnvironmentPlugin({
				NODE_ENV: 'development'
			}),
			new DefinePlugin({
				GLOBAL_API_HOST:JSON.stringify(constant.default.API_HOST[API_HOST])
			}),
			new WXAppWebpackPlugin({
				clear: !isDev
			}),
			new optimize.ModuleConcatenationPlugin(),
			new IgnorePlugin(/vertx/),
			min && new MinifyPlugin()
		].filter(Boolean),
		// devtool: isDev ? 'source-map' : false,
		resolve: {
			modules: [resolve(__dirname, 'src'), 'node_modules']
		},
		watchOptions: {
			ignored: /dist/,
			aggregateTimeout: 300
		}
	};
};
