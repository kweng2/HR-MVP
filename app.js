var Snake = angular.module('Snake', []);

Snake.controller('gameCtrl', function ($scope, $window, $interval) {
  $window.onkeypress = function(e) {
    console.log(e.charCode);
    var newDir;
  
    if (e.charCode === 119) {         // if the key is w, for up
      newDir = 1;
    } else if (e.charCode === 100) {  // key is d for right
      newDir = 2;
    } else if (e.charCode === 115) {  // key is s for down
      newDir = -1;
    } else if (e.charCode === 97) {   // key is a for left
      newDir = -2;
    }
    newDirection(newDir, $scope.gameState.head);
  };


  $scope.gameState = init();
  $scope.startGame = function () {
    // initialize the game
    $scope.gameState = init();

    // check each frame on an interval
    $scope.eachFrame = $interval(function() {
      checkFrame($scope.gameState, $scope, $interval);
    }, $scope.gameState.speed);

    var canvas = document.getElementById('board');
    $scope.canvasCtx = canvas.getContext('2d');

  };

  var checkFrame = function (gameState, $scope, $interval) {
  // advance the head
    advanceHead(gameState.head, gameState.body, gameState.stepSize);
    // console.log(gameState.head);
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
      // update display
      updateGameBoard($scope);
    }
    // window.gameState = gameState;
    $scope.gameState = gameState;
  };

  // draw the game board
  var updateGameBoard = function ($scope) {
    $scope.canvasCtx.clearRect(0,0,$scope.gameState.gameWindow.width,$scope.gameState.gameWindow.height);
    for (var i = 0; i < $scope.gameState.body.length; i++) {
      var x = $scope.gameState.body[i].x;
      var y = $scope.gameState.body[i].y;
      var w = $scope.gameState.stepSize;
      var h = w;
      $scope.canvasCtx.fillRect(x, y, w, h);
    }
  };

  $scope.changeDirection = function ($scope) {
    console.log('Detected keypress');
  };

});

