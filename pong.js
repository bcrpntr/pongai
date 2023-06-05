let canvas = document.getElementById('pongCanvas');
let ctx = canvas.getContext('2d');

let aiLevel = document.getElementById('aiLevel');
let aiMax = document.getElementById('aiMax');

// Define game objects
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 2, dy: 2 };
let playerPaddle = { x: 0, y: canvas.height / 2, width: 10, height: 50 };
let aiPaddle = { x: canvas.width - 10, y: canvas.height / 2, width: 10, height: 50 };

// Game update function
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
    if (ball.x < playerPaddle.x + playerPaddle.width && ball.y > playerPaddle.y && ball.y < playerPaddle.y + playerPaddle.height) {
        ball.dx *= -1;
    } else if (ball.x > aiPaddle.x && ball.y > aiPaddle.y && ball.y < aiPaddle.y + aiPaddle.height) {
        ball.dx *= -1;
    }

    // Update the AI paddle position
    // You would replace this with a call to your server-side AI logic
    if (aiMax.checked) {
        // If AI is set to max level, perfectly mirror the ball's movements
        aiPaddle.y = ball.y - aiPaddle.height / 2;
    } else {
        // If AI is not at max level, make it move towards the ball at a speed based on the aiLevel setting
        if (ball.y < aiPaddle.y) {
            aiPaddle.y -= aiLevel.value;
        } else if (ball.y > aiPaddle.y + aiPaddle.height) {
            aiPaddle.y += aiLevel.value;
        }
    }

    // Draw the ball and paddles
    ctx.fillRect(ball.x, ball.y, 10, 10);
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);

    // Call the update function again after a delay
    setTimeout(update, 20);
}

// Call the update function to start the game
update();
