let cameraX = 0;
let cameraY = 0;

function setup() {
  createCanvas(800, 600, WEBGL);
}

function draw() {
  background(220);

  // set the camera position based on the current cameraX and cameraY variables
  camera(cameraX, cameraY, 0);

  // translate the coordinate system to make (0, 0) the center of the screen
  translate(-width / 2, -height / 2);

  // loop through all the blocks and draw only the ones within the camera's view
  for (let block of blocks) {
    if (block.x > cameraX - width / 2 && block.x < cameraX + width / 2 &&
        block.y > cameraY - height / 2 && block.y < cameraY + height / 2) {
      drawBlock(block.x, block.y, block.color);
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    cameraX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    cameraX += 10;
  } else if (keyCode === UP_ARROW) {
    cameraY -= 10;
  } else if (keyCode === DOWN_ARROW) {
    cameraY += 10;
  }
}

function drawBlock(x, y, color) {
  push();
  translate(x, y);
  fill(color);
  rect(0, 0, blockSize, blockSize);
  pop();
}