numberOfFaces = 4; // How many face templates there are

let completeFaces = [];

let faceList = []; // list of blank face images
let eyeList = [];
let noseList = [];
let mouseList = [];
let browList = [];

let featureLists = [faceList, eyeList, noseList, mouseList, browList];

function preload() {
  
}

function setup() {
  createCanvas(400, 400);
  let fileName = 'faceParts/baseface/' + i + '.jpg'
  face1 = loadImage('faceParts/baseface/0.jpg') //placeholder
  
    
  
}

function draw() {
  background(220);
  drawFaces();
}

function drawFaces() {
  for (let i = 0; i < completeFaces.length; i ++) {
    
  }
}

function generateFace() {
  for (let i = 0; i <= 16; i ++) {
    
    let randBaseFace = random(faceList.length - 1);
    let randEye = random(eyeList.length - 1);
    let randNose = random(noseList.length - 1);
    let randMouth = random(mouthList.length - 1);
    let randBrow = random(browList.length - 1);

    let randomFace = {
      face: faceList[random(faceList.length - 1)],
      eye: randEye,
      nose: randNose,
      mouth: randMouth,
      brow: randBrow
    }

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