var express = require("express");
var path = require('path');

var app = express();
const port = 3003;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/static', express.static(path.join(__dirname, '/public')));

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});