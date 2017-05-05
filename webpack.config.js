const path = require('path');

const webpack = require('webpack');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const is_production = process.env.NODE_ENV === 'production';

const appRoot = __dirname;

module.exports = {

    watch: true,

    entry: {
        app: "./client/index.js",
    },

    output: {
        path: path.join(appRoot, "./assets/js/"),
        filename: "[name].js"
    },

    devtool: "#source-map",

    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['es2015', 'react', 'stage-2'],
                            plugins: ['transform-runtime']
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                use: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },

    // https://webpack.js.org/configuration/resolve/
    resolve: {
        modules: [
            path.resolve(appRoot, "js"),
            "node_modules"
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify(is_production ? 'production' : 'development')
          }
        }),

        // new CommonsChunkPlugin("commons"),

        // new StatsPlugin('stats.json', {
        //   chunkModules: true,
        //   // exclude: [/node_modules[\\\/]react/]
        // })
    ],

};
