import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import NodeExternals from 'webpack-node-externals';

module.exports = (env, options) => {
    const development = !options.prod;

    const config = {
        target: 'node',
        mode: development ? 'development' : 'production',
        entry: {
            server: ['@babel/polyfill', './server/server.js'],
        },
        output: {
            path: path.resolve(__dirname, './dist_server'),
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: '/node_modules/',
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                    ],
                                ],
                                plugins: [
                                    ['@babel/plugin-proposal-class-properties', { 'loose': false }],
                                    ...(development
                                        ? ['istanbul']
                                        : []),
                                ],
                                babelrc: false,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
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
            ],
        },
        externals: [NodeExternals()],
    };

    return config;
};
