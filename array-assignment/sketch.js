


'all placeholders' // How many of each feature there is, for populateFeatureArray()
let numberOfFaces = 4;
let numberOfEyes = 5;
let numberOfNoses = 7;
let numberOfMouths = 6;
let numberOfBrows = 5;

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

let sphereRadius = 100;

// let featureLists = [faceList, eyeList, noseList, mouseList, browList];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  // populateFeatureArrays(); 
  // populateTransOriginArray();
  generateHeads();
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

    sphere(Head.radius);

    Head.z = sin(Head.time) * 100 - 200;
    Head.time += 5;
    
    pop();
    // push();
    // translate(Origin.x, Origin.y);
    // pop();
  }
    // push and pop each face's transformation matrix
  
}


function generateHeads() {
  for (let xIter = 1; xIter <= 4; xIter++) {
    for (let yIter = 1; yIter <= 4; yIter++) {
      // selects a random feature out of a feature list

      // let randFace = random(faceList.length - 1);
      // let randEye = random(eyeList.length - 1);
      // let randNose = random(noseList.length - 1);
      // let randMouth = random(mouthList.length - 1);
      // let randBrow = random(browList.length - 1);
      
      // plugs the feature indices into the object randomHead
      let randomHead = {
        // face: randFace,
        // eye: randEye,
        // nose: randNose,
        // mouth: randMouth,
        // brow: randBrow,

        // set the spacial propeties for each face
        originX: width * xIter/4 - width/8,
        originY: height * yIter/4 - height/8,
        z: 0,
        radius: sphereRadius,
        time: xIter * 30 + yIter * 30,
      };
      
      // Pushes randomHead into the array of all the randomly generated faces heads
      heads.push(randomHead);
    }
  }
}

function populateFeatureArrays() {
  for (let i = 1; i <= numberOfFaces; i ++) {
    let fileName = `headParts/face/face${i}.jpg`;
    faceList.push(loadImage(fileName));
  }
      
  for (let i = 1; i <= numberOfEyes; i ++) {
    let fileName = `headParts/eyes/eye${i}.jpg`;
    eyeList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfNoses; i ++) {
    let fileName = `headParts/noses/nose${i}.jpg`;
    noseList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfMouths; i ++) {
    let fileName = `headParts/mouths/mouth${i}.jpg`;
    mouthList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfBrows; i ++) {
    let fileName = `headParts/brows/brow${i}.jpg`;
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

