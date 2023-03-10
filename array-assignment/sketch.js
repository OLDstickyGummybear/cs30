let completeFaces = [];

let faceList = [];

function setup() {
  createCanvas(400, 400);
  face1 = loadImage('faceParts/baseface/face1.jpg') //placeholder
  faceList.push(face1);
  
}

function draw() {
  background(220);
  drawFaces();
}

function drawFaces() {
  for (let i = 0; i < completeFaces.length; i ++) {
    
  }
}

function createFace() {
  for (let i = 0; i <= 16; i ++) {
    
    let randFace = random(faceList.length - 1);
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

    faces.push(randomFace);
  }
}