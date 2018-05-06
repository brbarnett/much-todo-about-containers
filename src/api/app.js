var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

let data = [{ "id": 1, "title": "this one", "completed": false }, { "id": 2, "title": "that one", "completed": false }, { "id": 3, "title": "another", "completed": false }, { "id": 4, "title": "here", "completed": false }];

app.get('/', function (req, res) {
    res.send(data);
});

app.post('/', function(req, res){
    data = req.body;
 
    res.sendStatus(200); 
});

// catch all 404
app.all('*', function(req, res){
    console.log(req.originalUrl);
    res.sendStatus(404);
})
 
console.log('starting application');
app.listen(port, function() {
    console.log('listening on', port);
}); 