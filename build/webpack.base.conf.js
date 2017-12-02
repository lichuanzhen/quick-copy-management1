const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

webpackConfig = {
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    externals: {
        echarts: {
            amd: 'echarts',
            root: 'Echarts',
            commonjs: 'echarts',
            commonjs2: 'echarts'
        }
    },
    output: {
        libraryTarget: 'umd',
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            static: path.resolve(__dirname, '../static'),
            src: path.resolve(__dirname, '../src'),
            api: path.resolve(__dirname, '../src/api'),
            assets: path.resolve(__dirname, '../src/assets'),
            components: path.resolve(__dirname, '../src/components'),
            router: path.resolve(__dirname, '../src/router'),
            store: path.resolve(__dirname, '../src/store'),
            styles: path.resolve(__dirname, '../src/styles'),
            utils: path.resolve(__dirname, '../src/utils'),
            views: path.resolve(__dirname, '../src/views')
        }
    },
    module: {
        rules: [
            // {
            //   test: /\.(js|vue)$/,
            //   loader: 'eslint-loader',
            //   enforce: 'pre',
            //   include: [resolve('src'), resolve('test')],
            //   options: {
            //     formatter: require('eslint-friendly-formatter')
            //   }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: []
};

if (!process.env.npm_config_nodll) {
    webpackConfig.plugins.push(new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../public/lib-mainfest.json')
    }));
}

module.exports = webpackConfig;
