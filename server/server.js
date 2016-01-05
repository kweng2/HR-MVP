var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var router = require('./router.js');


var app = express();

app.use(express.bodyParser());
app.use(express.static('client'));


var port = 5000;

app.listen(port);
console.log('Server now listening on port ' + port);
