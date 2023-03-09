let faces = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawFaces();
}

function drawFaces() {
  for (let i = 0; i < faces.length; i ++) {

  }
}

function createFace() {
  for (let i = 0; i <= 16; i ++) {
    
    let randEye = random(eyeList.length - 1);

    let randomFace = {
      face: randFace,
      eye: randEye,
      nose: randNose,
      mouth: randMouth,

    }

    faces.push(randomFace);
  }
}