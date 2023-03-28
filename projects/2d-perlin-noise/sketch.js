

let worldArray = [];

let zoom = 50;

let genXWidth = 100;
let genZWidth = 100;
let genYHeight = 50;

let genFloor = 12; // y= 12 is lowest terrain
let genCeiling = 1; // y= 50 is highest terrain

let cubeWidth = 30;

let camX = 0;
let camY = 0;
let camZ = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  strokeWeight(1);
  generateNoise();
  camera = createCamera();
  worldArray = createEmpty3dArray(genXWidth, genYHeight, genZWidth);
}


function draw() {
  // for (let z = 0; z < genZWidth; z ++) {
  //   for (let x = 0; x < genXWidth; x ++) {
  //     stroke(50, Math.floor(map(worldArray[z][x], genFloor, genCeiling, 10, 255)), 100);
  //     point(x, z);
  //   }
  // }
  background(0);
  renderTerrain();
}

function createEmpty3dArray(arrayX, arrayY, arrayZ) {
  let volume = [];
  for (let y = 0; y < arrayY; y++) {
    volume.push([]);
    for (let x = 0; x < arrayX; x++) {
      volume[y].push([]);
      for (let z = 0; z < arrayZ; z++) {
        volume[y][x].push(0);
      } 
    }
  }
  return volume;
}

function renderTerrain() {
  // // Wrong form
  // translate(-300, -300, 0)
  // for (let z = 0; z < genZWidth; z ++) {
  //   for (let x = 0; x < genXWidth; x ++) {
  //     push();
  //     translate(x * cubeWidth - 100, worldArray[z][x] + 100, z * cubeWidth);
  //     box(cubeWidth, cubeWidth, cubeWidth);
  //     pop();
  //   }
  // }
}

function generateNoise() {
  // text('Loading...', 10, 20);
  // worldArray = [];
  // for (let z = 1; z <= genZWidth; z ++) {
  //   let newColumn = [];
  //   for (let x = 1; x <= genXWidth; x ++) {
  //     blockHeight = round(map(noise(x / zoom, z / zoom), 0, 1, 0, 500));
  //     newColumn.push(blockHeight);
  //   }
  //   worldArray.push(newColumn);
  // }
  // console.log('terrain generated');

  for (let x = 0; x < worldArray[0].length; x++) {
    for (let z = 0; z < worldArray[0][0].length; z++) {
      worldArray[round(map(noise(x / zoom, z / zoom), 0, 1, 0, genYHeight))][x][z] = 1;
    }
  }
}

function keyPressed() {
  if (keyIsDown(87)) {
    camera.move(0, 0, -10)
  }
  if (keyIsDown(83)) {
    camera.move(0, 0, 10)
  }
  if (keyIsDown(65)) {
    camera.move(-10, 0, 0)
  }
  if (keyIsDown(68)) {
    camera.move(10, 0, 0)
  }
  if (keyIsDown(32)) {
    camera.move(0, -10, 0)
  }
  if (keyIsDown(16)) {
    camera.move(0, 10, 0)
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
