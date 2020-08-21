const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
require("@babel/register");

// Webpack Configuration
const config = {
    devtool: 'inline-source-map',

    entry: ['babel-polyfill', './src/index.ts'],

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.png$/,
                use: ['file-loader'],
            }
        ]
    },
    resolve:{
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Ceros Ski'
        })
    ],
};

module.exports = config;