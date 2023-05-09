// 2D Array Project
// Kevin Liu
// Mr. Schellenberg
// Computer Science 30
// April 6th, 2023
// This project procedurally generates a voxel-based terrain using perlin noise within a 3D array. The aesthetic aim is to recreate the terrain generation of Minecraft, including its layering of grass, dirt, and stone. The camera is moved with WASD, space, and shift as per Minecraft's control scheme, and rotated with the arrow keys. The render distance is limited to a square around the camera, which can be either increased or decreased with E or Q, respectively.
// Wow factors: The use of a third dimension; use of p5.Camera; use of Perlin noise to generate terrain.


// Declare the 3D array that contains the world data
let worldArray = [];

// Declares constants
const ZOOM = 20; // Controls size of details in terrain. Larger -> flatter
const CUBEWIDTH = 50;

// Declares variable to control render distance
let renderRadius = 9; // in blocks

// Declares default world generation dimensions
let genXWidth;
let genZWidth;
let genYHeight;

// Declares spawnpoint variables
let spawnY;
let spawnX;
let spawnZ;

// Declares block types
let grass;
let dirt;
let stone;

function preload() {
  // Preloads block textures
  grass = loadImage('grass.png');
  dirt = loadImage('dirt.png');
  stone = loadImage('stone.png');
}

function setup() {
  // Sets up canvas
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);

  // Sets up camera
  camera = createCamera();

  // Prompts user to input world generation size; the larger the number, the slower the generation.
  genXWidth = Number(prompt("World width:", "100"));
  genZWidth = Number(prompt("World length:", "100"));
  genYHeight = Number(prompt("World height:", "20"));
  
  // Generates empty 3D array according to the size specified above, saves array in worldArray
  worldArray = createEmpty3DArray(genXWidth, genYHeight, genZWidth);
  
  // Generates terrain in worldArray
  generateNoise(worldArray);

  // Calculates spawnpoint to be in the centre of the array
  spawnX = round(genXWidth/2);
  spawnZ = round(genZWidth/2);

  // Calculates safe Y-coordinate of spawnpoint using findSpawnY()
  spawnY = findSpawnY(spawnX, spawnZ, worldArray);

  // Moves camera to spawnpoint
  camera.eyeX = spawnX * CUBEWIDTH;
  camera.eyeY = spawnY * CUBEWIDTH;
  camera.eyeZ = spawnZ * CUBEWIDTH;
  camera.move(0, -1, 0);
}

function draw() {
  // Sets background color
  background('lightblue');

  // Sets lighting on blocks
  directionalLight(150, 150, 150, 1, 0, 0);
  directionalLight(100, 100, 100, 0, 0, 1);
  directionalLight(200, 200, 200, 0, 0, -1);
  directionalLight(200, 200, 200, -1, 0, 0);
  directionalLight(255, 255, 255, 0, 1, 0);

  // Detects keypresses
  moveCam();

  // Displays all blocks
  renderTerrainRanged(worldArray);
}

// Finds the Y-coordinate two blocks higher than the highest block at a given X- and Z-coordinate
function findSpawnY(x, z, array) {
  for (let y = 0; y < array.length; y++) {
    if (array[y][x][z] !== 0) { // If a block is at (x, y, z):
      return y - 3;
    }
  }
}

// Creates empty cubic array given a length, height, and width
function createEmpty3DArray(width, height, length) {
  let volume = []; // Creates empty output array 'volume'
  for (let y = 0; y < height; y++) { // For each height layer, insert empty array into volume
    volume.push([]);
    for (let x = 0; x < width; x++) { // For each width row within each height layer, insert empty array into height array
      volume[y].push([]); 
      for (let z = 0; z < length; z++) { // For each length block within each width row within each height layer, insert a 0 into width array
        volume[y][x].push(0);
      } 
    }
  }
  return volume; // Return output array 
}

// Displays all cubes
function renderTerrainRanged(array) {
  for (let y = 0; y < array.length; y++) { // For each height layer
    // Extra stuff below is to avoid reading array with out-of-range indices
    for (let x = Math.max(round(camera.eyeX / CUBEWIDTH) - renderRadius, 0); x < Math.min(round(camera.eyeX / CUBEWIDTH) + renderRadius, array[0].length); x++) { // For X, render from either the X-coord of the camera minus render distance or the 0th index, whichever is largest, to either X-coord of the camera plus render distance or the last index, whichever is smallest
      for (let z = Math.max(round(camera.eyeZ / CUBEWIDTH) - renderRadius, 0); z < Math.min(round(camera.eyeZ / CUBEWIDTH) + renderRadius, array[0][0].length); z++) { // For Z, same as above
        
        // Sets transformation matrix to where the cube should be
        push();
        translate(x * CUBEWIDTH, y * CUBEWIDTH, z * CUBEWIDTH);

        // If it is not 0 AND if the x y z is in the array
        if (!isNaN(array[y][x][z]) && array[y][x][z] !== 0) { 
          if (array[y][x][z] === 1) { // 1 in the array means grass
            texture(grass);
          }
          if (array[y][x][z] === 2) { // 2 in the array means dirt
            texture(dirt);
          }
          if (array[y][x][z] === 3) { // 3 in the array means stone
            texture(stone);
          }
          box(CUBEWIDTH, CUBEWIDTH, CUBEWIDTH); // Creates box
        }
        pop(); // Resets transformation matrix
      }
    }
  }
}

// Procedurally generates terrain
function generateNoise(array) {
  // Picks random start point for Perlin noise
  let xOffset = random(1000000);
  let zOffset = random(1000000);

  for (let x = 0; x < array[0].length; x++) { // For each X-coordinate
    for (let z = 0; z < array[0][0].length; z++) { // For each Z-coordinate
      let yGen = round(map(noise((x + xOffset) / ZOOM, (z + zOffset) / ZOOM), 0, 1, 0, genYHeight)); // Generates Perlin noise using x and z and their respective offsets, maps noise to fit in the height of the world array, and rounds to whole number
      array[yGen][x][z] = 1; // Generates top layer; 1 is grass

      // For each layer below the top layer
      for (let yIter = yGen + 1; yIter < array.length; yIter ++) {

        if (yIter <= yGen + 3) {// For 3 layers underneath the top layer
          array[yIter][x][z] = 2; // Sets block as dirt
        } 

        // add other layers here if needed with else if

        else { // For everything below
          array[yIter][x][z] = 3; // Sets block as stone
        }
      }
    }
  }
}

// Moves camera according to key presses
function moveCam() {
  // Camera translation
  if (keyIsDown(87)) { // W
    camera.move(0, 0, -10);
  }
  if (keyIsDown(83)) { // S
    camera.move(0, 0, 10);
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

  // Camera rotation
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

  // Logs camera coordinates in blocks
  console.log(`x: ${(camera.eyeX / CUBEWIDTH).toFixed(2)}, y: ${(camera.eyeY / CUBEWIDTH).toFixed(2)}, z: ${(camera.eyeZ / CUBEWIDTH).toFixed(2)}`);
}

// For all keypresses that does not need continuous execution while being held
function keyPressed() {
  // Change render distance
  if (keyIsDown(69) && renderRadius <= round(Math.max(genXWidth, genZWidth) / 2)) { // E; maximum render distance is either world width or length, whichever is largest (not recommended)
    renderRadius ++;
  }
  if (keyIsDown(81) && renderRadius >= 4) { // Q; minimum render distance is 4 blocks
    renderRadius --;
  }
} 
