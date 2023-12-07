const resolution = 15;
const foodCount = 5;
let food = new Array();
let snake;
let button;
let w;
let h;

function setup() {
  createCanvas(600, 500);
  w = floor(width / resolution);
  h = floor(height / resolution);
  snake = new Snake();
  frameRate(10 + snake.body.length);
  for (let i = 0; i < foodCount; i++) {
    createFood(i);
  }
}

function createFood(index) {
  const x = floor(random(w));
  const y = floor(random(h));
  food[index] = createVector(x, y);
}

function destroyFood(index) {
  food[index].set(-10, -10);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.xdir !== 1) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xdir !== -1) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW && snake.ydir !== -1) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW && snake.ydir !== 1) {
    snake.setDir(0, -1);
  }
}

function restartGame() {
  // literally just reloads the window.. genius
  print("test restart");
  window.location.reload();
}

function draw() {
  scale(resolution);
  background(220);
  for (let i = 0; i < foodCount; i++) {
    if (snake.eat(food[i])) {
      createFood(i);
    }
  }
  snake.update();
  snake.show();

  if (snake.checkEndGame()) {
    noLoop();
    for (let i = 0; i < foodCount; i++) {
      destroyFood(i);
    }
    print("game over.");
    background(255, 0, 0);
    fill(33, 33, 33);
    rect(0.2, 0.1, 11, 6);

    button = createButton("Restart Game");
    button.size(150, 75);
    button.position(w / 4, h / 4);
    button.mousePressed(restartGame);
  }

  textSize(1.5);
  text("Score: " + snake.body.length, 0.4, 1.5);

  noStroke();
  fill(255, 0, 100);
  for (let i = 0; i < foodCount; i++) {
    rect(food[i].x, food[i].y, 1, 1);
  }
}
