var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: String,
  highScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('Player', playerSchema);
