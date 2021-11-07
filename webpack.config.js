const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './build',
        hot: true,
        port: 9000,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', './index.html')
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                },
            },
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                auto: true,
                                localIdentName: "[name]__[local]--[hash:base64:5]",
                            },
                            sourceMap: isDev,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev
                        }
                    },
                ],
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'svg-react-loader',
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
    experiments: {
        topLevelAwait: true,
    }
};