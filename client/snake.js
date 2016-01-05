// head, node, and tail look like the following:
// var node = {
//   x: NUMBER,
//   y: NUMBER,
//   direction: 1, 
// }

// helper function to clone for generating body
var clone = function (obj) {
    if (null === obj || "object" != typeof obj) {
      return obj;
    }
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
};

// check collision with screen edge
var collideWithEdge = function (head, gameWindow) {
  if ( head.x < 0 || head.x >= gameWindow.width || head.y < 0 || head.y >= gameWindow.height ) {
    return true;
  } else {
    return false;
  }
};

// check collision with self
var collideWithSelf = function (head, body) {
  // loop through every node in body, except for the first one, because it's the head
  for (var i=1; i<body.length; i++) {
    // check to see if head's location matches this node's location
    if ( head.x === body[i].x && head.y === body[i].y ) {
      // clearly a collision, return true
      return true;
    }
  }
  // not a collision, return false
  return false;
};

// check user input, takes user input, and outputs new direction
var newDirection = function (newDir, head) {
  if (newDir !== head.direction && newDir !== -head.direction) {
    // valid input, neither in the same direction nor reverse
    head.direction = newDir;
  }
};

// define function for moving one step depending on direction
var moveHead = function (head, direction, stepSize) {
  // generate a new head, and return that new object
  var newHead = head;
  // move head here
  if (direction === 1) {  // move up
    newHead.y -= stepSize;
  } else if (direction === 2) { // move right
    newHead.x += stepSize;
  } else if (direction === -1) { // move down
    newHead.y += stepSize;
  } else if (direction === -2) { // move left
    newHead.x -= stepSize;
  }
  return newHead;
};

// body advancement
// var advanceBody = function (head, body, food, gameState) {
var advanceBody = function (gameState) {
  // Queue the body with the new head position
  gameState.body.unshift(clone(gameState.head));
  // if head is at a food, eating food, do not advance body, create new food
  if (gameState.head.x === gameState.food.x && gameState.head.y === gameState.food.y) {
    gameState.needFood = true;
  } else {
    // try to advance body, dequeue body, remove last item in body
    gameState.body.pop();
  }
};

// Head advancement
var advanceHead = function (gameState) {
  moveHead(gameState.head, gameState.head.direction, gameState.stepSize);
};

// define bodyGeneration
var generateBody = function (head, stepSize, startingLength) {
  // initialize output with only head
  var output = [clone(head)];
  // Fill the rest of body with nodes at the next location
  for (var i=1; i<startingLength; i++) {
    var bodyNext = clone(output[output.length - 1]);
    moveHead(bodyNext, -head.direction, stepSize);
    output.push(bodyNext);
  }
  // console.log(output);
  return output;
};

// define initialization
var init = function () {
  // declare game variables
  var gameState = {
    speed: 50,
    stepSize: 10,
    startingLength: 15,
    head: {
      x: 200,
      y: 100,
      direction: 2
    },
    food: {
      x: 200,
      y: 200
    },
    gameWindow: {
      width: 800,
      height: 500
    },
    needFood: false
  };
  gameState.body = generateBody(gameState.head, gameState.stepSize, gameState.startingLength);
  // return these variables
  return gameState;
};

// function to generate food
var generateFood = function (gameState) {
  console.log('generating new food');
  var newFoodX = Math.floor((gameState.gameWindow.width - gameState.stepSize)/gameState.stepSize * Math.random()) * gameState.stepSize;
  var newFoodY = Math.floor((gameState.gameWindow.height - gameState.stepSize)/gameState.stepSize * Math.random()) * gameState.stepSize;
  gameState.food.x = newFoodX;
  gameState.food.y = newFoodY;
  gameState.needFood = false;
};










