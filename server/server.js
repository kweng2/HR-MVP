var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var router = require('./router.js');
var DBcontroller = require('./DBcontroller.js');


var app = express();

var port = process.env.PORT || 5000;
var dbURI = process.env.MONGOLAB_URI ||'mongodb://localhost/snakeDB';

mongoose.connect(dbURI);

// app.use(express.bodyParser());
app.use(bodyParser());
app.use(express.static('client'));

app.get('/api/users', function (req, res) {
  DBcontroller.get(req.query, function (err, users) {
    if (err) {
      return res.json({error: err});
    } else {
      return res.json(users);
    }
  });
});

app.post('/api/users', function (req, res) {
  console.log('posting user', req.body);
  DBcontroller.post(req.body, function (err, addedUser) {
    // if (err) {
    //   console.log('errored', err);
    //   return res.json({error: err});
    // } else {
    //   console.log(addedUser);
    //   return res.json(addedUser);
    // }
    return res.json(addedUser);
  });
});

app.delete('/api/users', function (req, res) {
  DBcontroller.delete(req.body, function (err, deletedUsers) {
    if (err) {
      return res.json({error: err});
    } else {
      return res.json(deletedUsers);
    }
  });
});

app.put('/api/users', function (req, res) {
  console.log('updating user', req.body.name);
  // console.log(req.params);
  DBcontroller.updateOne(req.body.name, req.body, function(err, student) {
    if (err) {
      return res.json({error: err});
    } else {
      return res.json(student);
    }
  });
});

app.listen(port);
console.log('Server now listening on port ' + port);
