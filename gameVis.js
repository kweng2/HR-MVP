// var canvas = $('canvas')[0];

// setTimeout(function(){
//   var canvas = document.getElementById('board');


//   var canvasCtx = canvas.getContext('2d');
//   console.log(canvasCtx);
//   var WIDTH = 500;
//   var HEIGHT = 400;
//   // var WIDTH = gameState.gameWindow.width;
//   // var HEIGHT = gameState.gameWindow.height;
// }, 400);

var draw = function() {
// debugger;
  canvasCtx.clearRect(0,0,WIDTH,HEIGHT);
  for (var i = 0; i < gameState.body.length; i++) {

    // var value = freqDomain[i];
    // var percent = value / 256;
    // var height = HEIGHT * percent;
    // var offset = HEIGHT - height - 1;
    // var barWidth = WIDTH/analyser.frequencyBinCount;
    // var hue = i/analyser.frequencyBinCount * 360;

    var x = gameState.body[i].x;
    var y = gameState.body[i].y;
    var w = gameState.stepSize;
    var h = w;


    canvasCtx.fillRect(x, y, w, h);
  }
  // window.requestAnimationFrame(draw);
};
