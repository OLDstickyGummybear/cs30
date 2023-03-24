
const ROWS = 32;
const COLS = 16;
let grid;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2dArray(ROWS, COLS);

  if (width < height) {
    cellSize = width/COLS;
  } else {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayGrid(grid);
}

function displayGrid(grid) {
  for (let y = 0; y < ROWS; y ++) {
    for (let x = 0; x < COLS; x ++) {
      if (grid[y][x] === 0) {
        fill('yellow');
      }
      if (grid[y][x] === 1) {
        fill('blue');
      }
      square(x*cellSize, y*cellSize, cellSize)
    }
  }
}

function createEmpty2dArray(rows, cols) {
  let newGrid = [];
  for (let y = 0; y < rows; y ++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x ++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  toggleCell(x, y);
  toggleCell(x+1, y);
  toggleCell(x-1, y);
  toggleCell(x, y+1);
  toggleCell(x, y-1);

  // grid[Math.floor(mouseY/cellSize)][Math.floor(mouseX/cellSize)] = 1;
}

function toggleCell(x, y) {
  // Sanity check
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    } else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}