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

  // Update the AI paddle position using OpenAI logic
  const aiMove = getAIMove();
  aiPaddle.y = aiMove;

  // Draw the ball and paddles
  ctx.fillRect(ball.x, ball.y, 10, 10);
  ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
  ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);

  // Call the update function again after a delay
  setTimeout(update, 20);
}

async function getAIMove() {
  // Create the game state object
  const gameState = {
    ball: { x: ball.x, y: ball.y, dx: ball.dx, dy: ball.dy },
    playerPaddle: { x: playerPaddle.x, y: playerPaddle.y, width: playerPaddle.width, height: playerPaddle.height },
    aiPaddle: { x: aiPaddle.x, y: aiPaddle.y, width: aiPaddle.width, height: aiPaddle.height }
  };

  // Make API call to OpenAI using the environment variable for the API key
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: JSON.stringify(gameState),
      max_tokens: 1
    })
  });

  // Parse the response and extract the AI's move
  const data = await response.json();
  const aiMove = data.choices[0].text;

  return Number(aiMove); // Return the calculated move for the AI paddle as a number
}

setup();
update();
