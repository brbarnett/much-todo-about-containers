var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;

app.use(cors())
app.use(bodyParser.json());

let data = [{ "id": 1, "title": "this one", "completed": false }, { "id": 2, "title": "that one", "completed": false }, { "id": 3, "title": "another", "completed": false }, { "id": 4, "title": "here", "completed": false }];

app.get('/api', function (req, res) {
    res.send(data);
});

app.post('/api', function(req, res){
    data = req.body;

    res.sendStatus(200);
});

// catch all 404
app.all('*', function(req, res){
    res.sendStatus(404);
})

console.log('starting application');
app.listen(port, function() {
    console.log('listening on', port);
}); 