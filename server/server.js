var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var router = require('./router.js');
var DBcontroller = require('./DBcontroller.js');


var app = express();

var port = process.env.PORT || 5000;
var dbURI = process.env.MONGOLAB_URI ||'mongodb://localhost/snakeDB';

mongoose.connect(dbURI);

app.use(express.bodyParser());
app.use(express.static('client'));

app.get('/api/users', function (req, res) {
  console.log('SERVER HEARS A GET REQUEST TO /API/USERS');
  DBcontroller.get(req.query, function (err, users) {
    if (err) {
      return res.json({error: err});
    } else {
      console.log('no error, yay, got a response');
      return res.json(users);
    }
  });
});

app.post('/api/users', function (req, res) {
  console.log('SERVER HEARS A POST REQUEST TO /API/USERS');
  DBcontroller.post(req.body, function (err, addedUser) {
    if (err) {
      return res.json({error: err});
    } else {
      console.log('no error, yay, got a response');
      return res.json(addedUser);
    }
  });
});


app.listen(port);
console.log('Server now listening on port ' + port);
