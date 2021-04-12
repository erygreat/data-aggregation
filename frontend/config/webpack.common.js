const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

const pluginLoaderPath = path.resolve(__dirname, "../../plugins/src/loader.js")

module.exports = {
    entry: {
        app: "./src/index.tsx"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist/'),
        publicPath: '/static/',
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
            { test: /\.(js|jsx)?$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.module\.css$/i,
                use: [
                    'style-loader',
                    'css-loader?modules'
                ]
            },
            {
                test: /^((?!\.module).)*css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader?modules',
                    "sass-loader",
                ]
            },
        ]

    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@stylesheets': path.resolve(__dirname, '../src/stylesheets'),
            '@ui': path.resolve(__dirname, '../src/components/ui'),
            '@frontend': path.resolve(__dirname, '../../frontend/src'),
            '@plugins': path.resolve(__dirname, '../../plugins/src'),
        },
        extensions: [".ts", ".tsx", ".js", ".scss"]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            axios: 'axios'
        }),
        new WebpackShellPlugin({
            onBuildStart:[`node ${pluginLoaderPath}`]
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            name: true,
            minSize: 0,
            cacheGroups: {
                vendors: {
                    minChunks: 2,
                    name: 'commons',
                    chunks: 'all'
                },
            }

        }
    }
};