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
        // proxy: { "/api": "http://localhost:3000" },  // proxy all API calls to node api app. must be running
        before(app) {   // serve a mock from webpack
            var bodyParser = require('webpack-body-parser')
            app.use(bodyParser.json());

            let data = [{ "id": 1, "title": "this one", "completed": false }, { "id": 2, "title": "that one", "completed": false }, { "id": 3, "title": "another", "completed": false }, { "id": 4, "title": "here", "completed": false }];
            app.get('/api', function (req, res) {
                res.json(data);
            });
            app.post('/api', function (req, res) {
                data = req.body;

                res.json({success: true});
            })
        },
        hot: true
    },
    serve: {
        hot: true,
        logLevel: 'trace',
        open: true,
        port: 8080,
        writeToDisk: false
    }
};