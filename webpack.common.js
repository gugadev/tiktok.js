/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const paths = {
    source: resolve(__dirname, 'src')
}

module.exports = {
    entry: {
        tiktok: resolve(paths.source, 'tiktok.ts'),
        'use-tiktok': resolve(paths.source, 'use-tiktok.ts')
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: ['ts-loader'],
                exclude: [/node_modules/]
            }
        ]
    }
}
