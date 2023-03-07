// Cubic Disarray Demo
// March 7th, 2023

let boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  for (let i = 0; i < 15; i++) {
    spawnBox(random(width), random(height), 50, random(360));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < boxes.length; i++) {
    displayBox(boxes[i]);
  }
}

function displayBox(myBox) {
  push(); //saving transformation matrix

  translate(myBox.x, myBox.y);
  rotate(myBox.rotation);
  square(0, 0, myBox.size);

  pop(); //resetting transformation matrix
}

function spawnBox(theX, theY, theSize, howRotated) {
  let someBox = {
    x: theX,
    y: theY,
    size: theSize,
    rotation: howRotated,
  }
  boxes.push(someBox);
}