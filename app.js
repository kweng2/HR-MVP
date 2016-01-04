var Snake = angular.module('Snake', []);

Snake.controller('gameCtrl', function ($scope, $window, $interval) {
  // $scope.gameState = null;
  $scope.startGame = function () {
    // initialize the game
    $scope.gameState = init();
    // start interval
    // var intervalDriver = setInterval(function() {
    //   checkFrame($scope.gameState, intervalDriver);
    // }, $scope.gameState.speed);


    $scope.eachFrame = $interval(function() {
      checkFrame($scope.gameState, $scope, $interval);
    }, $scope.gameState.speed);

  };

  var checkFrame = function (gameState, $scope, $interval) {
  // advance the head
    advanceHead(gameState.head, gameState.body, gameState.stepSize);
    console.log(gameState.head);
    // advance the body
    advanceBody(gameState.head, gameState.body, gameState.food);
    // check collision with screen edge and self
    var collision = collideWithEdge(gameState.head, gameState.gameWindow) || collideWithSelf(gameState.head, gameState.body);
    // if there are collisions, end the loop
    if (collision) {
      $interval.cancel($scope.eachFrame);
      // clearInterval(internalDriver);
      ///////////////////////////////////////////////////////////////
      ////////////////// DO SOMETHING ///////////////////////////////
      ///////////////////////////////////////////////////////////////
    } else {
      // console.log('not collided');
      ///////////////////////////////////////////////////////////////
      ////////////////// DO SOMETHING ///////////////////////////////
      ///////////////////////////////////////////////////////////////

    }
    window.gameState = gameState;
};


});

