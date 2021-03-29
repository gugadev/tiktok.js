/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        ...common.entry,
        main: path.resolve(__dirname, 'example', 'app.tsx')
    },
    devServer: {
        watchContentBase: true,
        publicPath: '/',
        compress: true,
        port: 3001,
        writeToDisk: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html'
        })
    ]
})
