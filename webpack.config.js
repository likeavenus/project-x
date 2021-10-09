const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    output: {
        clean: true,
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './build',
        hot: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                }
            },
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDev
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev
                        }
                    },
                ],
                // use: [
                //     MiniCssExtractPlugin.loader,
                //     {
                //         loader: "css-loader",
                //         options: {
                //           sourceMap: isDev,
                //           modules: true
                //         },
                //     },
                //     {
                //         loader: "sass-loader",
                //         options: {
                //           sourceMap: isDev,
                //         },
                //     },
                // ],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
    },
    optimization: {
        minimize: isProd,
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true,
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              },
            },
          },
    },
};