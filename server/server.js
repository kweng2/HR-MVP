var express = require('express');


var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/client'));



var port = 5000;

app.listen(port);
console.log('Server now listening on port ' + port);
