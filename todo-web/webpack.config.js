const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    devServer: {
        proxy: {
            "/api": "http://localhost:3000"
          }
      }
};