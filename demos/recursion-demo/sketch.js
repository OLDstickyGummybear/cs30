function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(220);
  let theDepth = map(mouseX, 0, width, 0, 10);
  fractalCircle(width/2, width, theDepth);
}

function fractalCircle(x, d, depth) {
  // Base case
  
  circle(x, height/2, d);
  if (depth > 0) {
    depth --;
    fractalCircle(x-d/4, d/2, depth);
    fractalCircle(x+d/4, d/2, depth);
  }
}
