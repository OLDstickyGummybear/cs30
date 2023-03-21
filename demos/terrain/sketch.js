// Terrain Generation with Perlin Noise
// March 14, 2023

// let time = 0;
let rectWidth = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  
  // let x = noise(time) * width;
  // let y = noise(time + 1) * width;

  // fill('red');
  // circle(x, y, 50);

  // time += 0.05;

  
}

function spawnRectangles() {
  let time = 0;
  for (let x = 0; x <= width; x += rectWidth / 100) {
    
  }

  for (let x = 0; x <= width; x += rectWidth / 100) {
    let y = noise(x) * height;
    rect(x * 100, y, rectWidth, height);
  }
}