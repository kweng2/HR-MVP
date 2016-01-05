var Snake = angular.module('Snake', []);

Snake.controller('gameCtrl', function ($scope, $window, $interval, $http) {
  // Controller initialization code
  $scope.showInput = true;
  $scope.showCover = true;
  $scope.samePlayer = false;
  $scope.gameInstruct = false;
  $scope.inGame = false;

  // helper function to query database for previous players
  var getPlayers = function ($http, $scope) {
    return $http({
      method: 'GET',
      url: '/api/users'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // helper function to add user to database
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

  // helper function to update player score in database
  var updateUserScore = function ($http, $scope) {
    return $http({
      method: 'PUT',
      url: '/api/users',
      data: {
        name: $scope.playerName,
        highScore: $scope.gameState.body.length
      }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // When player enters a name, remove showInput, and show game instructions
  $scope.submitPlayerName = function () {
    // hide player name input
    $scope.showInput = false;

    // try to add a new user
    var addedUser = addUsers($http, $scope);
    addedUser.then(function(res){
      // debugger;
      if(res.error === 'Player already exists') {   // Error, existing player
        /////////////////////////////////////////////////
        //////////// Warn, existing player  /////////////
        /////////////////////////////////////////////////
        $scope.samePlayer = true;
        $scope.currentHighScore = res.player.highScore;
        $scope.currentName = res.player.name;
      } else {                                      // Success, added new player
        $scope.currentHighScore = res.highScore;
        $scope.currentName = res.name;

        // Hide the cover and hide the name input field
        $scope.showCover = false;
        // Display game instruction
        $scope.gameInstruct = true;
      }
    });
  };

  $scope.keyPress = function ($event) {
    var newDir = null;
    if ($event.which === 119) {         // if the key is w, for up
      newDir = 1;
    } else if ($event.which === 100) {  // key is d for right
      newDir = 2;
    } else if ($event.which === 115) {  // key is s for down
      newDir = -1;
    } else if ($event.which === 97) {   // key is a for left
      newDir = -2;
    } else if ($event.which === 107) {  // key is k
      if(!this.inGame && !this.showInput && !this.samePlayer) { // K to start game
        this.gameInstruct = false;
        this.startGame();
        this.inGame = true;
      } else if (this.samePlayer) {   // same player warning, press K to continue
        this.samePlayer = false;
        this.showCover = false;
        this.gameInstruct = true;
      }
    } else if ($event.which === 106) {  // key is j to change player
      if (!this.showInput && !this.samePlayer && !this.inGame) {  // game end
        this.gameInstruct = false;
        this.showInput = true;
        this.showCover = true;
      } else if (this.samePlayer) {   // same player warning, press J to change player
        this.samePlayer = false;
        this.showInput = true;
      }
    }
    // apply new direction to head
    if (newDir !== null) {
      newDirection(newDir, this.gameState.head);
    }
  };

  $scope.startGame = function () {
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
    // if($scope.gameState.body.length)
    $scope.gameState.speed = 100 - (3 * Math.floor($scope.gameState.body.length/20));
    // advance head
    advanceHead(gameState);
    // advance the body
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
      $scope.gameInstruct = true;
      $scope.inGame = false;
      // $scope.showInput = true;
      ///////////////////////////////////////////////////////////////
      ////////////////// DO SOMETHING ///////////////////////////////
      ///////////////////////////////////////////////////////////////
      // check to see if current score is greater than this player's highscore
      if ($scope.gameState.body.length > $scope.currentHighScore) {
        // set player's highscore to be the current score
        $scope.currentHighScore = $scope.gameState.body.length;
        // update the score in the database
        updateUserScore($http, $scope).then(function(res) {
          // update the leaderboard
          getPlayers($http, $scope).then(function (res) {
            $scope.allPlayers = res;
          });
        });
      }
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

    // Update leaderboard
  getPlayers($http, $scope).then(function (res) {
    $scope.allPlayers = res;
  });

  // initialize game
  $scope.gameState = init();

});

