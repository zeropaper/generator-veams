/**
 * Plugins
 */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

/**
 * Environment & Config
 */
const env = process.env.NODE_ENV;

module.exports = function scriptPlugins() {
	const local = env === 'local';
	let plugins = [
		// new BundleAnalyzerPlugin(),
		// Add module names to factory functions so they appear in browser profiler.
		new webpack.NamedModulesPlugin(),
		// Makes some environment variables available to the JS code.
		new webpack.DefinePlugin({
			env: JSON.stringify(env)
		}),
		// Watcher doesn't work well if you mistype casing in a path so we use
		// a plugin that prints an error when you attempt to do this.
		// See https://github.com/facebookincubator/create-react-app/issues/240
		new CaseSensitivePathsPlugin(),
		// If you require a missing module and then `npm install` it, you still have
		// to restart the development server for Webpack to discover it. This plugin
		// makes the discovery automatic so you don't have to restart.
		// See https://github.com/facebookincubator/create-react-app/issues/186
		new WatchMissingNodeModulesPlugin('node_modules'),
		// Copy asset files from src/app
		new CopyWebpackPlugin([ {
			from: `assets`,
			ignore: [ '.gitkeep' ]
		} ])
	];

	if (!local) {
		plugins.push(new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false, // Suppress uglification warnings
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true
			},
			output: {
				comments: false
			}
		}));
	}

	return plugins;
};