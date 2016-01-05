var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: String,
  highScore: Number
});

module.exports = mongoose.model('Player', playerSchema);
