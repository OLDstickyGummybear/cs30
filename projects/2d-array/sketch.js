

noiseArray = [];

function setup() {
  createCanvas(400, 400);
  strokeWeight(1);
  generateNoise();
}


function draw() {
  for (let y = 1; y <= height; y ++) {
    for (let x = 1; x <= width; x ++) {
      fill(Math.floor(map(noiseArray[y][x], 0, 1, 10, 255)));
      point(x, y);

    }
  }
  
}

function generateNoise() {
  for (let y = 1; y <= height; y ++) {
    let newColumn = [];
    for (let x = 1; x <= width; x ++) {
      newColumn.push(noise(x / 3, y / 3)); 
    }
    noiseArray.push(newColumn);
  }
}