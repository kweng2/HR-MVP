var Snake = angular.module('Snake', []);

Snake.controller('startGame', function ($scope) {
  $scope.start = function () {
    gameDriver();
  };
});

