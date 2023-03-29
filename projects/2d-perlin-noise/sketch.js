

let worldArray = [];

let zoom = 50;

let genXWidth = 50;
let genZWidth = 50;
let genYHeight = 50;

// let genFloor = 12; // y= 12 is lowest terrain
// let genCeiling = 1; // y= 50 is highest terrain

let cubeWidth = 30;

let camX = 0;
let camY = 0;
let camZ = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  strokeWeight(1);
  
  camera = createCamera();
  worldArray = createEmpty3dArray(genXWidth, genYHeight, genZWidth);
  
  generateNoise();

  camera.move(500, 100, 1000); // sets starting camera position
  rotateY(0.7);

  renderTerrain();
  
}


function draw() {
  
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
  background(0);
  orbitControl();
  console.log('rendering');
  for (let y = 0; y < worldArray.length; y++) {
    for (let x = 0; x < worldArray[0].length; x++) {
      for (let z = 0; z < worldArray[0][0].length; z++) {
        push();
        translate(x * cubeWidth, y * cubeWidth - 200, z * cubeWidth);

        if (worldArray[y][x][z] === 1) {
          box(cubeWidth, cubeWidth, cubeWidth);
        }
        pop();
      }
    }
    // console.log('layer rendered');
  }
}

function generateNoise() {
  let xOffset = random(1000000);
  let zOffset = random(1000000);

  for (let x = 0; x < worldArray[0].length; x++) {
    for (let z = 0; z < worldArray[0][0].length; z++) {
      let yGen = round(map(noise((x + xOffset) / zoom, (z + zOffset) / zoom), 0, 1, 0, genYHeight));
      worldArray[yGen][x][z] = 1;
      for (let yIter = yGen + 1; yIter < worldArray.length; yIter ++) {
        console.log(yIter,x,z);
        worldArray[yIter][x][z] = 1;
      }
    }
  }
  console.log('terrain generated');

  // Fill the ground beneath
  // for (let y = 0; y < worldArray.length; y++) {
  //   for (let x = 0; x < worldArray[0].length; x++) {
  //     for (let z = 0; z < worldArray[0][0].length; z++) {
  //       if (worldArray[y][x][z] === 1) {
  //         for (let yIter = worldArray[y][x][z] - 1; yIter < worldArray.length; yIter ++) {
  //           console.log(yIter,x,z);
  //           worldArray[yIter][x][z] = 1;
  //         }
  //       }
  //     }
  //   }
  // }

}

function keyPressed() {
  if (keyIsDown(87)) {
    camera.move(0, 0, -10);
    
  }
  if (keyIsDown(83)) {
    camera.move(0, 0, 10);
    console.log('moving back');
  }
  if (keyIsDown(65)) {
    camera.move(-10, 0, 0);
  }
  if (keyIsDown(68)) {
    camera.move(10, 0, 0);
  }
  if (keyIsDown(32)) {
    camera.move(0, -10, 0);
  }
  if (keyIsDown(16)) {
    camera.move(0, 10, 0);
  }
  renderTerrain();
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
