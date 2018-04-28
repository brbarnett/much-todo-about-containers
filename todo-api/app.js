var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send({ content: 'do this' });
});

app.listen(3000);