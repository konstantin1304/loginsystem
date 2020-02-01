import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import PostCssSaveParser from 'postcss-safe-parser';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = (env, options) => {
    const development = !options.prod;

    const config = {
        mode: development ? 'development' : 'production',
        entry: {
            index: ['@babel/polyfill', './src/js/init/init.js'],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[hash:8].js',
        },
        devServer: {
            //Show only compiler errors.
            overlay: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: '/node_modules/',
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            forceAllTransforms: !development,
                                            modules: false,
                                            useBuiltIns: 'entry',
                                            debug: false,
                                        },
                                    ],
                                    [
                                        '@babel/preset-react',
                                        {
                                            development: development,
                                        },
                                    ],
                                ],
                                plugins: [
                                    ['@babel/plugin-proposal-class-properties', { 'loose': false }],
                                    '@babel/plugin-transform-spread',
                                    '@babel/plugin-proposal-export-default-from',
                                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                                    ['@babel/plugin-syntax-dynamic-import'],
                                    ['@babel/plugin-transform-async-to-generator', {
                                        module: 'bluebird',
                                        method: 'coroutine',
                                    }],
                                ...(development ? ['babel-plugin-styled-components'] :
                                        ['@babel/transform-react-constant-elements',
                                        'transform-react-remove-prop-types'])],
                                babelrc: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.(less|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                    ],
                },
                {
                    test: /\.(svg|png)$/,
                    oneOf: [
                        {
                            test: /\.(svg)$/,
                            use: [
                                {
                                    loader: 'url-loader',
                                },
                            ],
                        },
                        {
                            test: /\.(png)$/,
                            use: [
                                {
                                    loader: 'file-loader',
                                    options: {
                                        name: '[path][name].[ext]',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: false,
            }),
            new webpack.DefinePlugin({
                __DEV__: development,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash:8].css',
            }),
            new CopyWebpackPlugin([
                // {
                //     from: './assets/',
                //     to: './assets/',
                // },
            ]),
            new HtmlWebpackPlugin({
                inject: true,
                minify: {
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                    removeComments: true,
                    useShortDoctype: true,
                    keepClosingSlash: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                },
                filename: 'index.html',
                template: 'public/index.html',
            }),
            ...development ? [
                new webpack.HotModuleReplacementPlugin(),
            ] : [
                new webpack.HashedModuleIdsPlugin({
                    hashFunction: 'sha256',
                    hashDigest: 'hex',
                    hashDigestLength: 6,
                }),
            ],
        ],
        devtool: development ? '#source-map' : false,
        optimization: {
            minimize: !development,
            noEmitOnErrors: !development,
            minimizer: [
                new TerserWebpackPlugin({
                    parallel: true,
                    cache: true,
                    sourceMap: false,
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            passes: 2,
                            inline: 2,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                        },
                    },
                }),
                new OptimizeCssAssetsPlugin({
                    cssProcessorOptions: {
                        parser: PostCssSaveParser,
                        map: false,
                        discardComments: { removeAll: true },
                    },
                }),
            ],
        },
    };

    return config;
};
