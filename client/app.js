var Snake = angular.module('Snake', []);

Snake.controller('gameCtrl', function ($scope, $window, $interval, $http) {

  $scope.showInput = true;

  // initialize the controller
  var getUsers = function ($http, $scope) {
    return $http({
      method: 'GET',
      url: '/api/users'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addUsers = function ($http, $scope) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {name: $scope.playerName}
      //STUFF HERE
      /////////////////////////////////////////////////
      //////////// substitute new high score //////////
      /////////////////////////////////////////////////
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var updateUserScore = function ($http, $scope) {
    return $http({
      method: 'PUT',
      url: '/api/users',
      data: 0//STUFF HERE
      /////////////////////////////////////////////////
      //////////// substitute new high score //////////
      /////////////////////////////////////////////////
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // When player enters a name
  $scope.submitPlayerName = function () {
    // console.log($scope.playerName);
    // Hide the cover and hide the name input field
    $scope.showInput = false;
    addUsers($http, $scope);
  };


  // get all previous players
  getUsers($http, $scope).then(function (res) {
    $scope.allPlayers = Array.prototype.slice.call(res);
  });



  $window.onkeypress = function(e) {
    var newDir = null;
    if (e.charCode === 119) {         // if the key is w, for up
      newDir = 1;
    } else if (e.charCode === 100) {  // key is d for right
      newDir = 2;
    } else if (e.charCode === 115) {  // key is s for down
      newDir = -1;
    } else if (e.charCode === 97) {   // key is a for left
      newDir = -2;
    }
    // apply new direction to head
    if (newDir !== null) {
      newDirection(newDir, $scope.gameState.head);
    }
  };

  // initialize game
  $scope.gameState = init();
  $scope.startGame = function () {
    console.log($window.playerName);
    // initialize the game
    $scope.gameState = init();

    // check each frame on an interval
    $scope.eachFrame = $interval(function() {
      checkFrame($scope.gameState, $scope, $interval);
    }, $scope.gameState.speed);

    // initialize canvas to enable drawing
    var canvas = document.getElementById('board');
    $scope.canvasCtx = canvas.getContext('2d');
  };

  // check game states per frame
  var checkFrame = function (gameState, $scope, $interval) {
    advanceHead(gameState);
    // advance the body
    // advanceBody(gameState.head, gameState.body, gameState.food, gameState);
    advanceBody(gameState);
    // check food situation
    if(gameState.needFood) {
      generateFood(gameState);
    }
    // check collision with screen edge and self
    var collision = collideWithEdge(gameState.head, gameState.gameWindow) || collideWithSelf(gameState.head, gameState.body);
    // if there are collisions, end the loop
    if (collision) {
      $interval.cancel($scope.eachFrame);
      ///////////////////////////////////////////////////////////////
      ////////////////// DO SOMETHING ///////////////////////////////
      ///////////////////////////////////////////////////////////////
    } else {
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
    var w = $scope.gameState.stepSize;
    var h = w;
    for (var i = 0; i < $scope.gameState.body.length; i++) {
      var x = $scope.gameState.body[i].x;
      var y = $scope.gameState.body[i].y;

      $scope.canvasCtx.fillRect(x, y, w, h);
    }
    $scope.canvasCtx.fillRect($scope.gameState.food.x, $scope.gameState.food.y, w, h);
  };
});

