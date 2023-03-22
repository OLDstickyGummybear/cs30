// Kevin Liu
//


// This program randomly generates 16 faces from a list of features and displays them on a dazzling array of undulating and rotating cubes.

// Wow factors: the use of WEBGL b

'all placeholders' // How many of each feature there is, for populateFeatureArray()
let numberOfFaces = 5;
let numberOfEyes = 6;
let numberOfNoses = 5;
let numberOfMouths = 5;
let numberOfBrows = 4;

// Array of selected facial features, to be displayed.
let heads = [];

// Number of faces to be generated. Always 16
// const NUMOFCOMPLETEFACES = 16;

// Arrays of features to choose from
let faceList = [];
let eyeList = [];
let noseList = [];
let mouthList = [];
let browList = [];

let headTransOrigins = [];

const CUBEWIDTH = 200;

let pg;
let img;

// let featureLists = [faceList, eyeList, noseList, mouseList, browList];

function preload() {
  populateFeatureArrays(); 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  
  generateHeads();
  noStroke();
  img = loadImage('headParts/faces/face2.jpeg')

  pg = createGraphics(550, 591);
}

function draw() {
  background(220);
  drawFaces();
}

function drawFaces() {
  // Set origin to top left corner
  translate(windowWidth/2 * -1, windowHeight/2 * -1);

  for (let Head of heads) {
    
    push();
    translate(Head.originX, Head.originY, Head.z);
    rotateY(Head.time / 5);

    pg.image(faceList[Head.face], 0, 0);
    pg.image(mouthList[Head.mouth], 155, 400, 200, 100);
    pg.image(noseList[Head.nose], 210, 260, 100, 150);
    pg.image(eyeList[Head.eye], 290, 260, 100, 60)

    pg.image(browList[Head.brow], 260, 210, 130, 60)
    
    pg.push()
    pg.scale(-1, 1);
    pg.image(browList[Head.brow], -260, 210, 130, 60)
    pg.image(eyeList[Head.eye], -230, 260, 100, 60)
    pg.pop()
    
    texture(pg);
    box(Head.width);

    Head.z = sin(Head.time) * 100 - 200;
    Head.time += 5;
    
    pop();
  }  
}


function generateHeads() {
  for (let xIter = 1; xIter <= 4; xIter++) {
    for (let yIter = 1; yIter <= 4; yIter++) {
      // selects a random feature out of a feature list

      let randFace = round(random(faceList.length - 1));
      let randEye = round(random(eyeList.length - 1));
      let randNose = round(random(noseList.length - 1));
      let randMouth = round(random(mouthList.length - 1));
      let randBrow = round(random(browList.length - 1));
      
      // plugs the feature indices into the object randomHead
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
      
      // Pushes randomHead into the array of all the randomly generated faces heads
      heads.push(randomHead);
    }
  }
}

function populateFeatureArrays() {
  for (let i = 1; i <= numberOfFaces; i ++) {
    let fileName = `headParts/faces/face${i}.jpeg`;
    faceList.push(loadImage(fileName));
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

// function drawFaces() {
//   translate(windowWidth/2 * -1, windowHeight/2 * -1);
//   let z = 0;
//   for (let Origin of headTransOrigins) {
    
//     push();
//     translate(Origin.x, Origin. c y, z);
//     sphere(80);
    
//     pop();
//     // push();
//     // translate(Origin.x, Origin.y);
//     // pop();
//   }
//     // push and pop each face's transformation matrix
  
// }

// function generateFaces() {

//   for (let i = 0; i <= NUMOFCOMPLETEFACES; i ++) {
    
//     // selects a random feature out of a feature list
//     let randBaseFace = random(faceList.length - 1);
//     let randEye = random(eyeList.length - 1);
//     let randNose = random(noseList.length - 1);
//     let randMouth = random(mouthList.length - 1);
//     let randBrow = random(browList.length - 1);
    
//     // plugs the feature indices into the object randomHead
//     let randomHead = {
//       face: randBaseFace,
//       eye: randEye,
//       nose: randNose,
//       mouth: randMouth,
//       brow: randBrow,
//       x,
//       y,
//       z: 0,
//     };

//     // Pushes randomHead into the array of all the randomly generated faces heads
//     heads.push(randomHead);
//   }
// }


// function populateTransOriginArray() {
//   for (let xIter = 1; xIter <= 4; xIter++) {
//     for (let yIter = 1; yIter <= 4; yIter++) {
//       headTransOrigins.push({x: width * xIter/ 5, y: height * yIter/5});
//     }
//   }
// }

