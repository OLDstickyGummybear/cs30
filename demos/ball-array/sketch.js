class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = random(5, 20);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.alpha = random(100, 255);
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      while (this.x - this.radius <= 0) {
        this.x += 1;
      }
      while (this.x + this.radius >= width) {
        this.x -= 1;
      }
      this.dx *= -1;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
      while (this.y - this.radius <= 0) {
        this.y += 1;
      }
      while (this.y + this.radius >= height) {
        this.y -= 1;
      }
      this.dy *= -1;
    }
  }

  collisionCheck(otherBall) {
     let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
     let radiiSum = this.radius + otherBall.radius;

     if (distanceApart < radiiSum) {
      this.r = 255;
      this.g = 0;
      this.b = 0;
      this.dx *= -1;
      this.dy *= -1;
     }

  }

}

let allBalls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  for (let someBall of allBalls) {
    someBall.update();
    for (let anotherBall of allBalls) {
      if (someBall !== anotherBall) {
        someBall.collisionCheck(anotherBall);

      }
    }
    someBall.display();

  }
}

function mousePressed() {
  let theBall = new Ball(mouseX, mouseY);
  allBalls.push(theBall);
}