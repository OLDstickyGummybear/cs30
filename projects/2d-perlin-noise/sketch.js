// 2D Array Project
// Kevin Liu
// Mr. Schellenberg
// Computer Science 30
// April 6th, 2023
// This project procedurally generates a voxel-based terrain using perlin noise within a 3D array. The aesthetic aim is to recreate the terrain generation of Minecraft, including its layering of grass, dirt, and stone. The camera is moved with WASD, space, and shift as per Minecraft's control scheme, and rotated with the arrow keys. The render distance is limited to a square around the camera, which can be either increased or decreased with E or Q, respectively.


let worldArray = [];

let zoom = 20;

let genXWidth;
let genZWidth;
let genYHeight = 20;

// let genFloor = 12; // y= 12 is lowest terrain
// let genCeiling = 1; // y= 50 is highest terrain

let cubeWidth = 50;

let spawnY;
let spawnX;
let spawnZ;

let grass;
let dirt;

let renderRadius = 9; // in blocks

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

  genXWidth = Number(prompt("World width:", "50"));
  genZWidth = Number(prompt("World length:", "50"));
  genYHeight = Number(prompt("World height:", "20"));

  spawnX = round(genXWidth/2);
  spawnZ = round(genZWidth/2);
  
  camera = createCamera();
  worldArray = createEmpty3dArray(genXWidth, genYHeight, genZWidth);
  
  generateNoise();

  spawnY = findSpawnY(spawnX, spawnZ, worldArray);
  
  // camera.move(0, 0, 1000);

  // camera.move(spawnX * cubeWidth, (worldArray.length - spawnY) * cubeWidth, spawnZ * cubeWidth); // sets starting camera position
  camera.move(spawnX * cubeWidth, spawnY * cubeWidth, spawnZ * cubeWidth);
}

function findSpawnY(x, z, array) {
  for (let y = 0; y < array.length; y++) {
    if (array[y][x][z] !== 0) {
      console.log(y);
      return y - 2;
    }
  }
}

function draw() {
  // camera.tilt(2);
  // renderTerrainRanged();
  background(0);
  directionalLight(150, 150, 150, 1, 0, 0);
  directionalLight(100, 100, 100, 0, 0, 1);
  directionalLight(200, 200, 200, 0, 0, -1);
  directionalLight(200, 200, 200, -1, 0, 0);
  directionalLight(255, 255, 255, 0, 1, 0);

  moveCam();

  renderTerrainRanged();

  console.log(`upX: ${camera.upX}, upY: ${camera.upY}, centerZ: ${camera.upZ}`);

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
  for (let y = 0; y < worldArray.length; y++) {
    for (let x = Math.max(round(camera.eyeX / cubeWidth) - renderRadius, 0); x < Math.min(round(camera.eyeX / cubeWidth) + renderRadius, worldArray[0].length); x++) {
      for (let z = Math.max(round(camera.eyeZ / cubeWidth) - renderRadius, 0); z < Math.min(round(camera.eyeZ / cubeWidth) + renderRadius, worldArray[0][0].length); z++) {
        push();
        translate(x * cubeWidth, y * cubeWidth, z * cubeWidth);

        if (!isNaN(worldArray[y][x][z]) && worldArray[y][x][z] !== 0) { // If the block at x y z is in the array AND if it is not 0
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

function renderTerrain() {
  console.log('rendering');

  fill('red')
  translate(0, 200, 0)
  box(5, 5, 5);

  for (let y = 0; y < worldArray.length; y++) {
    for (let x = 0; x < worldArray[0].length; x++) {
      for (let z = 0; z < worldArray[0][0].length; z++) {
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
      }
    }
  }
  console.log('terrain generated');
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
  
  

  console.log(`x: ${round(camera.eyeX / cubeWidth)}, y: ${round(camera.eyeY / cubeWidth)}, z: ${round(camera.eyeZ / cubeWidth)}`);
}

function keyPressed() {
  if (keyIsDown(69) && renderRadius <= round(Math.max(genXWidth, genZWidth) / 2)) { // E
    renderRadius ++;
  }
  if (keyIsDown(81) && renderRadius >= 4) { // Q
    renderRadius --;
  }
} 
