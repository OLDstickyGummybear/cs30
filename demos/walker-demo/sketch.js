// OOP Walker Demo

class Walker {
  constructor () {
    this.x = width/2;
    this.y = height/2;
    this.color = "red";
    this.speed = 5;
    this.size = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);

  }
}

let kevin;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kevin = new Walker();
}


function draw() {
  kevin.display();

}
