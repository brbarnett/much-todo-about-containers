var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());

let data = [{ "id": 1, "title": "this one", "completed": false }, { "id": 2, "title": "that one", "completed": false }, { "id": 3, "title": "another", "completed": false }, { "id": 4, "title": "here", "completed": false }];

app.get('/', function (req, res) {
    res.send(data);
});

app.post('/', function(req, res){
    data = req.body;

    res.sendStatus(200);
});

app.listen(3000); 