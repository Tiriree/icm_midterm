var input;
//var analyzer;

var osc;
var fft;

//declare variables
var threshold;
var levelOne;
var levelTwo;
var levelMax;
var volume;

function setup() {
  //createCanvas(800, 600);
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Create an Audio input
  input = new p5.AudioIn();

  input.start();
  //input.loop();

  // noise = new p5.Noise('brown');
  // noise.amp(0);
  // noise.start();

  delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime, feedback, filter frequency
  // play with these numbers!!
  delay.process(input, .102, .7, 2300);

  // play the noise with an envelope,
  // a series of fades ( time / value pairs )
  env = new p5.Env(.01, 0.2, .2, .1);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();
  fft = new p5.FFT();

  // If the volume > 0.1,  a rect is drawn at a random location.
  // The louder the volume, the larger the rectangle.
  threshold = 0.1;
  levelOne = 0.2;
  levelTwo = 0.3;
  levelMax = 0.4;
  volume = 0;

}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  volume = input.getLevel();
  //console.log(volume);


  //update levelMax
  if (volume > levelMax) {
    volumeMax = volume;
  }


  if (volume > threshold && volume < levelOne) {
    stroke(1);
    rect(random(40, width), height / 2, volume * 100, volume * 100);
  }
  if (volume > levelOne && volume < levelTwo) {
    stroke(1);
    ellipse(random(60, width), height / 2, volume * 50, volume * 50);
  }
  if (volume > levelTwo && volume < levelMax) {
    stroke(1);
    var aux1 = random(0, width);
    var aux2 = random(0, height);
    //console.log(aux1);
    //console.log(aux2);
    console.log(volume);
    var aux3 = map(volume, levelTwo, levelMax, 0, width);
    line(aux1, aux2, aux3, height / 2);
  }


  // Graph the overall potential volume, w/ a line at the threshold
  var y = map(volume, 0, 1, height, 0);
  var ythreshold = map(threshold, 0, 1, height, 0);

  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  var speed = map(mouseY, 0.1, height, 0, 2);
  speed = constrain(speed, 0.01, 4);
  // input.rate(speed);


  // for fft
  var freq = map(mouseX, 0, 800, 20, 15000);
  freq = constrain(freq, 1, 20000);
  osc.freq(freq);

  var spectrum = fft.analyze();

}

// mouseClick triggers envelope
// function mouseClicked() {
//   // is mouse over canvas?
//   if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
//     env.play(noise);
//   }
// }

// only play sound when mouse is over canvas
function mouseMoved() {
  console.log("hey");
  var mX = mouseX;
  var mY = mouseY;
  if (mX > 0 && mX < width && mY < height && mY > 0) {
    osc.amp(0.5, 0.2);
  } else {
    osc.amp(0, 0.2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}