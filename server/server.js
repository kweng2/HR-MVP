var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var router = require('./router.js');

var app = express();

var port = process.env.PORT || 5000;
var dbURI = process.env.MONGOLAB_URI ||'mongodb://localhost/snakeDB';

mongoose.connect(dbURI);

app.use(express.bodyParser());
app.use(express.static('client'));



app.listen(port);
console.log('Server now listening on port ' + port);
