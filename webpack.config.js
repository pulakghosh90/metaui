var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'tgt/public/js');
var APP_DIR = path.resolve(__dirname, 'src/app');
var config = {
    entry: APP_DIR + '/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }
        ]
    },
    resolve: {
        root: [
            APP_DIR
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'tgt/public'),
        inline: true,
        stats: "errors-only",
        port: 3000,
        historyApiFallback: true
    }
};

module.exports = config;