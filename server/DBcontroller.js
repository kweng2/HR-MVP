var Player = require('./Player.js');

exports.get = function(query, callback) {
  // console.log('got here');
  Player.find(query, callback);
};

exports.post = function(player, callback) {
  Player.create(player, callback);
};

// exports.getOne = function(query, callback) {
//   Player.findOne(query, callback);
// };

exports.updateOne = function(id, updated, callback) {
  Player.findOneAndUpdate({_id: id}, updated, {new: true}, callback);
};

// exports.deleteOne = function(id, callback) {
//   Player.findOneAndRemove({_id: id}, callback);
// };

// exports.delete= function(query, callback) {
//   Player.remove(query, callback);
// };
