var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './../server/public/js');
var APP_DIR = path.resolve(__dirname, 'src');

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
        contentBase: path.resolve(__dirname, '/../server/public'),
        inline: true,
        stats: "errors-only",
        port: 3030,
        historyApiFallback: true
    }
};

module.exports = config;