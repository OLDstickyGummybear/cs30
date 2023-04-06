

let worldArray = [];

let zoom = 20;

let genXWidth = 1000;
let genZWidth = 1000;
let genYHeight = 20;

// let genFloor = 12; // y= 12 is lowest terrain
// let genCeiling = 1; // y= 50 is highest terrain

let cubeWidth = 50;

let spawnY;
let spawnX;
let spawnZ;

let grass;
let dirt;

let renderRadius = 15; // in blocks

let yOffset = -200;

function preload() {
  grass = loadImage('grass.png');
  dirt = loadImage('dirt.png');
  stone = loadImage('stone.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);

  spawnX = round(genXWidth/2);
  spawnZ = round(genZWidth/2);
  
  camera = createCamera();
  worldArray = createEmpty3dArray(genXWidth, genYHeight, genZWidth);
  
  generateNoise();

  spawnY = findSpawnY(spawnX, spawnZ);
  
  // camera.move(0, 0, 1000);

  camera.move(spawnX * cubeWidth, -spawnY * cubeWidth, spawnZ * cubeWidth); // sets starting camera position
  camera.pan(45);
  camera.tilt(45);


  renderTerrain();
  
}

function findSpawnY(x, z) {
  for (let y = 0; y < worldArray.length; y++) {
    if (worldArray[y][x][z] != 0) {
      return y + 2;
    }
  }
}

function draw() {
  // push();
  // fill('red')
  // translate(0, 200, 0)
  // box(5, 1000, 5);
  // pop();

  // camera.tilt(2);
  // renderTerrainRanged();
  background(0);
  directionalLight(255, 255, 255, 2, 0, 0);
  directionalLight(255, 255, 255, 0, 0, 2);
  directionalLight(255, 255, 255, 0, 0, -2);
  directionalLight(255, 255, 255, -2, 0, 0);
  directionalLight(255, 255, 255, 0, 0.5, 0);

  moveCam();

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

function renderTerrainRanged() {
  background(0);
  console.log('rendering (ranged)');

  let eyeX = camera.eyeX / cubeWidth;
  let camY = camera.eyeY / cubeWidth;
  let eyeZ = camera.eyeZ / cubeWidth;

  // fill('red')
  // translate(0, 200, 0)
  // box(5, 5, 5);

  for (let y = camY - renderRadius; y < camY + renderRadius + 1; y++) {
    for (let x = eyeX - renderRadius; x < eyeX + renderRadius + 1; x++) {
      for (let z = eyeZ - renderRadius; z < eyeZ + renderRadius; z++) {
        push();
        translate(x * cubeWidth, y * cubeWidth + yOffset, z * cubeWidth);

        if (worldArray[y][x][z] !== 0) {
          if (worldArray[y][x][z] === 1) {
            fill('green');
          }
          if (worldArray[y][x][z] === 2) {
            fill('brown');
          }

          box(cubeWidth, cubeWidth, cubeWidth);
        }
        pop();
      }
    }
  }
}

function renderTerrain() {
  console.log('rendering');

  // fill('red');
  // translate(0, 200, 0);
  // box(5, 5, 5);

  for (let y = 0; y < worldArray.length; y++) {
    for (let x = round(camera.eyeX / cubeWidth) - renderRadius; x < round(camera.eyeX / cubeWidth) + renderRadius; x++) {
      for (let z = round(camera.eyeZ / cubeWidth) - renderRadius; z < round(camera.eyeZ / cubeWidth) + renderRadius; z++) {
        push();
        translate(x * cubeWidth, y * cubeWidth + yOffset, z * cubeWidth);

        if (worldArray[y][x][z] !== 0) {
          if (worldArray[y][x][z] === 1) {
            texture(grass);
          }
          if (worldArray[y][x][z] === 2) {
            texture(dirt);
          }
          if (worldArray[y][x][z] === 3) {
            texture(stone);
          }

          box(cubeWidth, cubeWidth, cubeWidth);
        }
        pop();
        // console.log('rendered block at ${x}, ${y}, ${z}');
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
      worldArray[yGen][x][z] = 1; // Generates top layer; 1 is grass
      for (let yIter = yGen + 1; yIter < worldArray.length; yIter ++) {
        console.log(yIter,x,z);

        if (yIter < yGen + 4) {
          worldArray[yIter][x][z] = 2; // Generates lower layers; 2 is dirt
        } 
        // add other layers if needed with else if
        else {
          worldArray[yIter][x][z] = 3; // Generates lower layers; 3 is stone
        }

        // (worldArray.length - yGen < 5 ? worldArray.length : yGen + 5)
      //   worldArray[yIter][x][z] = 2; // Generates lower layers; 2 is dirt
      // }
      // for (let yIter = yGen + 1; yIter < worldArray.length; yIter ++) {
      //   console.log(yIter,x,z);
      //   worldArray[yIter][x][z] = 2; // Generates lower layers; 3 is stone
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

function moveCam() {
  if (keyIsDown(87)) { // W
    camera.move(0, 0, -10);
    
  }
  if (keyIsDown(83)) { // S
    camera.move(0, 0, 10);
    console.log('moving back');
  }
  if (keyIsDown(65)) { // A
    camera.move(-10, 0, 0);
  }
  if (keyIsDown(68)) { // D
    camera.move(10, 0, 0);
  }
  if (keyIsDown(32)) { // SPACE
    camera.move(0, -10, 0);
  }
  if (keyIsDown(16)) { // SHIFT
    camera.move(0, 10, 0);
  }

  if (keyIsDown(LEFT_ARROW)) { // <-
    camera.pan(1);
  }
  if (keyIsDown(RIGHT_ARROW)) { // ->
    camera.pan(-1);
  }
  if (keyIsDown(UP_ARROW)) { // ^
    camera.tilt(-1);
  }
  if (keyIsDown(DOWN_ARROW)) { // v
    camera.tilt(1);
  }


  console.log(camera.eyeX);
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
