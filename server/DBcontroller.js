var Player = require('./Player.js');

exports.get = function(query, callback) {
  Player.find(query, callback);
};

exports.post = function(player, callback) {
  // if player already exists, do not add player
  Player.findOne({'name': player.name}, function (err, existingPlayer) {
    if(existingPlayer) {
      callback(null, existingPlayer);
    } else {
      Player.create(player, callback);
    }
  });
};

exports.updateOne = function(name, updated, callback) {
  Player.findOneAndUpdate({'name': name}, updated, {new: true}, callback);
};

exports.delete= function(query, callback) {
  Player.remove(query, callback);
};

// exports.getOne = function(query, callback) {
//   Player.findOne(query, callback);
// };
// exports.deleteOne = function(id, callback) {
//   Player.findOneAndRemove({_id: id}, callback);
// };

