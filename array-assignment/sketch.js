
'all placeholders' // How many of each feature there is, for populateFeatureArray()
let numberOfFaces = 4;
let numberOfEyes = 5;
let numberOfNoses = 7;
let numberOfMouths = 6;
let numberOfBrows = 5;

// Array of selected facial features, to be displayed.
let completeFaces = [];
let numOfCompleteFaces = 16;

// Arrays of features to choose from
let faceList = [];
let eyeList = [];
let noseList = [];
let mouthList = [];
let browList = [];

// let featureLists = [faceList, eyeList, noseList, mouseList, browList];

function setup() {
  createCanvas(windowWidth, windowHeight);
  populateFeatureArrays(); 
  generateFaces();
}

function draw() {
  background(220);
  drawFaces();
  circle(50, 50, 45);
}

function drawFaces() {
  for (let i = 0; i < completeFaces.length; i ++) {
    // push and pop each face's transformation matrix
  }
}

function generateFaces() {

  for (let i = 0; i <= numOfCompleteFaces; i ++) {
    
    // selects a random feature out of a feature list
    let randBaseFace = random(faceList.length - 1);
    let randEye = random(eyeList.length - 1);
    let randNose = random(noseList.length - 1);
    let randMouth = random(mouthList.length - 1);
    let randBrow = random(browList.length - 1);
    
    // plugs the feature indices into the object randomFace
    let randomFace = {
      face: randBaseFace,
      eye: randEye,
      nose: randNose,
      mouth: randMouth,
      brow: randBrow
    };

    // Pushes randomFace into the array of all the randomly generated faces completeFaces
    completeFaces.push(randomFace);
  }
}

function populateFeatureArrays() {
  for (let i = 1; i <= numberOfFaces; i ++) {
    let fileName = `faceParts/baseface/${i}.jpg`;
    faceList.push(loadImage(fileName));
  }
      
  for (let i = 1; i <= numberOfEyes; i ++) {
    let fileName = `faceParts/eyes/${i}.jpg`;
    eyeList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfNoses; i ++) {
    let fileName = `faceParts/noses/${i}.jpg`;
    noseList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfMouths; i ++) {
    let fileName = `faceParts/mouths/${i}.jpg`;
    mouthList.push(loadImage(fileName));
  }

  for (let i = 1; i <= numberOfNoses; i ++) {
    let fileName = `faceParts/noses/${i}.jpg`;
    noseList.push(loadImage(fileName));
  }
}