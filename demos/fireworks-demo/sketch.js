let allSparks = [];


class Spark {
  constructor(x, y, dx, dy, color) {
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
    this.alpha --;
    this.dy += 0.01;
  }
  
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  attraction() {
    // see physics stuff
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
  for (let i = allSparks.length - 1; i >= 0; i--) { //count  backwards for reasons
    allSparks[i].display();
    allSparks[i].updateGrav();

    // Remove if needed
    if (allSparks[i].isDead()) {
      allSparks.splice(i, 1);
    }
  }

}

function spawnSpark(dx, dy) {
  let theSpark = new Spark(mouseX, mouseY, dx, dy, "white");
  allSparks.push(theSpark);
}

function mousePressed() {
  for (let i = 0; i < 720; i++) {
    
    spawnSpark(random(cos(i)-0.5, cos(i)+0.5), random(sin(i)-0.5, sin(i)+0.5));

  }
}