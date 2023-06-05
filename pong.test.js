const { update } = require('./pong');

// Mock the canvas and context objects
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Set up the initial game state
const ball = { x: 100, y: 100, dx: 2, dy: 2 };
const playerPaddle = { x: 0, y: 200, width: 10, height: 50 };
const aiPaddle = { x: 290, y: 200, width: 10, height: 50 };

describe('Pong Game', () => {
  beforeEach(() => {
    // Reset the game state before each test
    ball.x = 100;
    ball.y = 100;
    ball.dx = 2;
    ball.dy = 2;
    playerPaddle.y = 200;
    aiPaddle.y = 200;
  });

  test('Ball should move correctly', () => {
    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(ball.x).toBe(102);
    expect(ball.y).toBe(102);
  });

  test('Ball should bounce off top and bottom edges', () => {
    // Set the ball's position near the top edge
    ball.y = 5;
    ball.dy = -2;

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(ball.dy).toBe(2); // The ball should bounce off the top edge and change its direction
  });

  test('Ball should bounce off player paddle', () => {
    // Set the ball's position and direction to hit the player paddle
    ball.x = playerPaddle.x + playerPaddle.width - 2;
    ball.y = playerPaddle.y + playerPaddle.height / 2;
    ball.dx = -2;

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(ball.dx).toBe(2); // The ball should bounce off the player paddle and change its direction
  });

  test('Ball should bounce off AI paddle', () => {
    // Set the ball's position and direction to hit the AI paddle
    ball.x = aiPaddle.x - 2;
    ball.y = aiPaddle.y + aiPaddle.height / 2;
    ball.dx = 2;

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(ball.dx).toBe(-2); // The ball should bounce off the AI paddle and change its direction
  });

  test('AI paddle should move correctly towards the ball', () => {
    // Set the ball's position to be above the AI paddle
    ball.x = aiPaddle.x - 10;
    ball.y = aiPaddle.y - 10;

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(aiPaddle.y).toBe(198); // The AI paddle should move upwards towards the ball
  });
});
