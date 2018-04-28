const path = require('path');

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
    }
};