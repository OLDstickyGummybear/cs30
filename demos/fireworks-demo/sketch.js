let allSparks = [];

let GRAV = 1;

class Spark {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.alpha = 255;
    this.size = 5;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.size);
  }

  updateGrav() {
    this.x += this.dx;
    this.y += this.dy;
    // this.alpha --;
    // this.dy += 0.01;
  }
  
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  attraction(allSparks) {
    // see physics stuff
    let gravX = 0;
    let gravY = 0;

    for (let i = 0; i < allSparks.length - 1; i++) {
      let otherSpark = allSparks[i];
      if (otherSpark !== this) {
        gravX += (GRAV * otherSpark.size / dist(this.x, this.y, otherSpark.x, otherSpark.y) **2) * cos(atan((otherSpark.y - this.y)/(otherSpark.x - this.x)));
        
        // console.log((GRAV * otherSpark.size / dist(this.x, this.y, otherSpark.x, otherSpark.y) **2) * cos(atan((this.y - otherSpark.y)/(this.x - otherSpark.x))));
        
        gravY += (GRAV * otherSpark.size / dist(this.x, this.y, otherSpark.x, otherSpark.y) **2) * sin(atan((otherSpark.y - this.y)/(otherSpark.x - this.x)));
      }
    }
    this.dx += gravX;
    this.dy += gravY;
  }

  isDead() {
    return this.alpha < 0;
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 0, 50);
  // for (let i = allSparks.length - 1; i >= 0; i--) { //count  backwards for reasons
  //   allSparks[i].display();

  //   allSparks[i].update();

    // Remove if needed
    // if (allSparks[i].isDead()) {
    //   allSparks.splice(i, 1);
    // }
  // }

  for (let i = 0; i < allSparks.length - 1; i++) {
    allSparks[i].display();
    allSparks[i].attraction(allSparks);
    allSparks[i].update();
  }
}

function spawnSpark(x, y, dx, dy) {
  let theSpark = new Spark(x, y, dx, dy);
  allSparks.push(theSpark);
}

function mousePressed() {
  let numOfSparks = 10
  for (let i = 0; i < numOfSparks; i++) {
    let spawnRadius = 50;
    degrees =  i* 360 / numOfSparks;
    spawnSpark(mouseX + (spawnRadius * cos(degrees)), mouseY + (spawnRadius * sin(degrees)), 0, 0);//random(cos(degrees) - 0.5, cos(degrees) + 0.5), random(sin(degrees) - 0.5, sin(degrees) + 0.5));
    // spawnSpark(cos(degrees), sin(degrees));

  }
}