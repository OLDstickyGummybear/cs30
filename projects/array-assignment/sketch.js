// Kevin Liu
// Mr. Schellenberg
// Computer Science 30
// March 21st, 2023
// This program randomly generates 16 faces from a list of features and displays them on a dazzling array of undulating and rotating cubes. Each time the page is reloaded, a new set of faces are generated and a new background colour is picked.
// Wow factors: the use of WEBGL to display 3D cubes and texture them, which I had never explored before. The application of sin() in the movements of the cubes on the z-axis. The use of createGraphics() to assemble each face off-screen.

// How many of each feature there are, for populateFeatureArray().
let numberOfFaces = 5;
let numberOfEyes = 6;
let numberOfNoses = 5;
let numberOfMouths = 5;
let numberOfBrows = 4;

// Array of selected facial features, to be displayed.
let heads = [];

// Arrays of features to choose from. Stores image objects.
let faceList = [];
let eyeList = [];
let noseList = [];
let mouthList = [];
let browList = [];

// Array of translation origins for each face.
let headTransOrigins = [];

const CUBEWIDTH = 200;

let bgColor;

let pg;

// let featureLists = [faceList, eyeList, noseList, mouseList, browList];

function preload() {
  // Loads all images into their respective feature array.
  populateFeatureArrays(); 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noStroke();
  
  // Randomizes features for each head.
  generateHeads();

  // Creates an off-screen graphics buffer in which each face will be assembled.
  pg = createGraphics(550, 591);

  bgColor = [random(256), random(256), random(256)];
}

function draw() {
  background(bgColor[0], bgColor[1], bgColor[2]);
  drawFaces();
}

// Draws the face on the canvas.
function drawFaces() {
  // Set origin to top left corner
  translate(windowWidth/2 * -1, windowHeight/2 * -1);

  // For each generated head,
  for (let Head of heads) {
    
    push(); // Saves the previous transformation matrix
    translate(Head.originX, Head.originY, Head.z); // Moves the translation origin to the appropriate point on the canvas
    rotateY(Head.time / 5); // Rotates cube

    // Assembles face in the off-screen graphics buffer.
    pg.image(faceList[Head.face], 0, 0);
    pg.image(mouthList[Head.mouth], 155, 400, 200, 100);
    pg.image(noseList[Head.nose], 210, 260, 100, 150);
    pg.image(eyeList[Head.eye], 290, 260, 100, 60)

    pg.image(browList[Head.brow], 260, 210, 130, 60)
    
    // Handles mirrored features.
    pg.push();
    pg.scale(-1, 1); // mirrors tranformation matrix.
    pg.image(browList[Head.brow], -260, 210, 130, 60)
    pg.image(eyeList[Head.eye], -230, 260, 100, 60)
    pg.pop();
    
    // Textures and creates a cube.
    texture(pg);
    box(Head.width);

    Head.z = sin(Head.time) * 100 - 200;
    Head.time += 5;
    
    pop(); // Resets the transformation matrix.
  }  
}

// Creates 16  randomHead objects and generates a random set of features for each.
function generateHeads() {
  // For each of the four columns,
  for (let xIter = 1; xIter <= 4; xIter++) {
    //For each row within the column,
    for (let yIter = 1; yIter <= 4; yIter++) {

      // selects a random index for a feature out of a feature list.
      let randFace = round(random(faceList.length - 1));
      let randEye = round(random(eyeList.length - 1));
      let randNose = round(random(noseList.length - 1));
      let randMouth = round(random(mouthList.length - 1));
      let randBrow = round(random(browList.length - 1));
      
      // plugs the feature indices into the object randomHead.
      let randomHead = {
        face: randFace,
        eye: randEye,
        nose: randNose,
        mouth: randMouth,
        brow: randBrow,

        // set the spacial propeties for each face
        originX: width * xIter/4 - width/8,
        originY: height * yIter/4 - height/8,
        z: 0,
        width: CUBEWIDTH,
        time: xIter * 30 + yIter * 30,
      };
      
      // Pushes randomHead into the array of all the randomly generated heads.
      heads.push(randomHead);
    }
  }
}

// Loads all images into their respective feature arrays.
function populateFeatureArrays() {
  // For each face image file,
  for (let i = 1; i <= numberOfFaces; i ++) {
    let fileName = `headParts/faces/face${i}.jpeg`;
    faceList.push(loadImage(fileName)); // Stores the image in the array faceList
  }
      
  for (let i = 1; i <= numberOfEyes; i ++) {
    let fileName = `headParts/eyes/eye${i}.png`;
    eyeList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfNoses; i ++) {
    let fileName = `headParts/noses/nose${i}.png`;
    noseList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfMouths; i ++) {
    let fileName = `headParts/mouths/mouth${i}.png`;
    mouthList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfBrows; i ++) {
    let fileName = `headParts/brows/brow${i}.png`;
    browList.push(loadImage(fileName));
  }
}