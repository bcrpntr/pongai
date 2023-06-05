let canvas;
let ctx;

function setup() {
  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

// Define game objects
let ball = { x: 0, y: 0, dx: 2, dy: 2 };
let playerPaddle = { x: 0, y: 0, width: 10, height: 50 };
let aiPaddle = { x: 0, y: 0, width: 10, height: 50 };

function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce the ball off the top and bottom edges
  if (ball.y < 0 || ball.y > canvas.height) {
    ball.dy *= -1;
  }

  // Bounce the ball off the paddles
  if (
    ball.x < playerPaddle.x + playerPaddle.width &&
    ball.y > playerPaddle.y &&
    ball.y < playerPaddle.y + playerPaddle.height
  ) {
    ball.dx *= -1;
  } else if (
    ball.x > aiPaddle.x &&
    ball.y > aiPaddle.y &&
    ball.y < aiPaddle.y + aiPaddle.height
  ) {
    ball.dx *= -1;
  }

  // Draw the ball and paddles
  ctx.fillRect(ball.x, ball.y, 10, 10);
  ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
  ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);

  // Call the update function again after a delay
  setTimeout(update, 20);
}

setup();
update();
