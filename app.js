var snakeJS = require('snake.js');

var Snake = angular.module('Snake', []);

Snake.controller('startGame', function ($scope, snakeJS) {
  $scope.start = snakeJS.gameDriver();
});

