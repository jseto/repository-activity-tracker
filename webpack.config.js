const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ( env, arg ) => {
	return {
		mode: 'development',
		entry: {
			'repository-activity-tracker': './src/front-end/index.tsx'
		},
		output: {
			filename: '[name].main.js'
		},
		devtool: 'source-map',
		resolve: {
			extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
				},
				{
					test: /\.svg$/,
					use: [
						'desvg-loader/react', // Add loader (use 'desvg-loader/react' for React)
						'svg-loader', // svg-loader must precede desvg-loader
					],
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader"
					]
				},
				{
			    test: /\.scss$/,
			    use: [
			      MiniCssExtractPlugin.loader,
			      "css-loader",
			      "sass-loader"
			    ],
			  },
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'repository-activity-tracker.css'
			}),
			new HtmlWebpackPlugin({
				template: 'src/front-end/index.html',
				templateParameters: {
					title: 'Repository Activity Tracker'
				},
				hash: true,
			}),
		]
	}
}