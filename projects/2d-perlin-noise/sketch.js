

let noiseArray = [];

let zoom = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1);
  generateNoise();
}


function draw() {
  for (let y = 1; y <= height; y ++) {
    for (let x = 1; x <= width; x ++) {
      stroke(50, Math.floor(map(noiseArray[y][x], 0, 1, 10, 255)), 100);
      point(x, y);
    }
  }
  
}

function generateNoise() {
  // text('Loading...', 10, 20);
  // noiseArray = [];
  for (let y = 1; y <= height; y ++) {
    let newColumn = [];
    for (let x = 1; x <= width; x ++) {
      newColumn.push(noise(x / zoom, y / zoom));
      // newColumn.push(map(noise(x / 5, y / 5) / noise(y / 4, x / 4), 0, 4, 0, 1)); 
    }
    noiseArray.push(newColumn);
  }

}

// function keyPressed() {
//   if (keyIsDown(UP_ARROW)) {
//     zoom += 50;
//   }
//   if (keyIsDown(DOWN_ARROW)) {
//     zoom -= 50;
//   }
//   generateNoise();
// } 
