// head, node, and tail look like the following:
// var node = {
//   x: NUMBER,
//   y: NUMBER,
//   direction: 1, 
// }

// check collision with screen edge
var collideWithEdge = function (head, gameWindow) {
  if ( head.x < 0 || head.x > gameWindow.width || head.y < 0 || head.y > gameWindow.height ) {
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
var newDirection = function (userInput, head) {
  //////////////////////////////////////////////////////////////////////
  /////////// Assume there exists a variable called userInput //////////
  /////////////// MUST CHANGE THIS ASSUMPTION HERE   ///////////////////
  //////////////////////////////////////////////////////////////////////
  if (userInput.direction !== head.direction && userInput.direciton !== -head.direction) {
    // valid input, neither in the same direction nor reverse
    head.direction = userInput.direction;
  }
};

// define function for moving one step depending on direction
var moveHead = function (head, stepSize) {
  // generate a new head, and return that new object
  var newHead = head;
  // move head here
  if (head.direction === 1) {  // move up
    newHead.y -= stepSize;
  } else if (head.direction === 2) { // move right
    newHead.x += stepSize;
  } else if (head.direction === -1) { // move down
    newHead.y += stepSize;
  } else if (head.direction === -2) { // move left
    newHead.x -= stepSize;
  }
  return newHead;
};

// body advancement
var advanceBody = function (head, body, food) {
  // Queue the body with the new head position
  body.unshift(head);
  // if head is at a food, eating food, do not advance body
  if (!(head.x === food.x && head.y === food.y)) {
    // try to advance body, dequeue body, remove last item in body
    body.pop();
  }
};

// Head advancement
var advanceHead = function (head, body, stepSize) {
  // firstly, move the head
  // if user hit an arrow, update direction, after checking validity

  //////////////////////////////////////////////////////////////////////
  //////////// temporarily disable newDirection ////////////////////////
  //////////////////////////////////////////////////////////////////////
  // newDirection(userInput, head);

  // advance the head
  var newHead = moveHead(head, stepSize);
  head = newHead;
};

// define bodyGeneration
var generateBody = function (head, stepSize, startingLength) {
  // initialize output with only head
  var output = [head];
  // Fill the rest of body with nodes at the next location
  for (var i=1; i<startingLength; i++) {
    output.push(moveHead(output[output.length-1], stepSize));
  }
  return output;
};

// define initialization
var init = function () {
  // declare game variables
  var gameState = {
    speed: 25,
    stepSize: 5,
    startingLength: 10,
    head: {
      x: 100,
      y: 100,
      direction: 2
    },
    body: generateBody(this.head, this.stepSize, this.startingLength),
    food: {
      x: 200,
      y: 200
    },
    gameWindow: {
      width: 800,
      height: 800
    }
  };
  // return these variables
  return gameState;
};

// for every frame, do the following:
var checkFrame = function ( gameState, internalDriver ) {
  // advance the head
  advanceHead(gameState.head, gameState.body, gameState.stepSize);
  console.log(gameState.head.x, gameState.head.y);
  // advance the body
  advanceBody(gameState.head, gameState.body, gameState.food);
  // check collision with screen edge and self
  var collision = collideWithEdge(gameState.head, gameState.gameWindow) && collideWithSelf(head, body);
  // if there are collisions, end the loop
  if (collision) {
    clearInterval(internalDriver);
  }
};

// gameDriver to drive the game
var gameDriver = function () {
  // initialize the game
  var gameState = init();
  // start interval
  var intervalDriver = setInterval(checkFrame(gameState, intervalDriver), gameState.speed);
};


gameDriver();













