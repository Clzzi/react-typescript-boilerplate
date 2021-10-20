var path = require('path');
var webpack = require('webpack');
var dotenv = require('dotenv-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = function (env) {
    return {
        entry: './src/index.tsx',
        output: {
            path: path.join(__dirname, '../dist'),
            filename: "[name].[hash].bundle.js",
            chunkFilename: '[name].[chunkhash].js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@': path.resolve(__dirname, '../src/'),
            },
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        name: 'vendor',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]/,
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true,
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|woff|woff2|ttf|ico)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                svgoConfig: {
                                    plugins: [
                                        {
                                            removeRasterImages: false,
                                            removeStyleElement: false,
                                            removeUnknownsAndDefaults: false,
                                            removeViewBox: false,
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new dotenv({
                path: env.prodcution ? './env/env' : './env/dev.env',
            }),
            new ForkTsCheckerWebpackPlugin(),
        ],
    };
};
//# sourceMappingURL=webpack.config.common.js.map