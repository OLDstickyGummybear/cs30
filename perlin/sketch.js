// Perlin demo with bubbles

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  window.setInterval(spawnBubble, 100);
}

function draw() {


  for (let bubble of theBubbles) {
    //move
    bubble.x = noise(bubble.time) * width;
    bubble.y = noise(bubble.time + 1) * height;


    // Displaying
    fill(bubble.color);
    circle(bubble.x, bubble.y, bubble.size);

    bubble.time += 0.01
  }
}

function spawnBubble() {
  let bubble = {
    x: random(width),
    y: random(height),
    size: random(5,50),
    color: color(random(255), random(255), random(255), random(255)),
    time : random(0, 10000),
  };

  theBubbles.push(bubble);
}

function mousePressed() {
  spawnBubble();
}