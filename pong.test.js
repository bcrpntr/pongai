const { update } = require('./pong');
const { JSDOM } = require('jsdom');

let canvas;
let ctx;
let ball;
let playerPaddle;
let aiPaddle;

beforeEach(() => {
  const dom = new JSDOM('<!DOCTYPE html><html><body><canvas id="pongCanvas"></canvas></body></html>');
  global.document = dom.window.document;
  global.window = dom.window;

  canvas = document.getElementById('pongCanvas');
  ctx = canvas.getContext('2d');

  ball = { x: 100, y: 100, dx: 2, dy: 2 };
  playerPaddle = { x: 0, y: 200, width: 10, height: 50 };
  aiPaddle = { x: 290, y: 200, width: 10, height: 50 };
});

describe('Pong Game', () => {
  test('Ball should move correctly', () => {
    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(ball.x).toBe(102);
    expect(ball.y).toBe(102);
  });

  test('Ball should bounce off top and bottom edges', () => {
    ball.y = 5;
    ball.dy = -2;

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(ball.dy).toBe(2);
  });

  test('Ball should bounce off player paddle', () => {
    ball.x = playerPaddle.x + playerPaddle.width - 2;
    ball.y = playerPaddle.y + playerPaddle.height / 2;
    ball.dx = -2;

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(ball.dx).toBe(2);
  });

  test('Ball should bounce off AI paddle', () => {
    ball.x = aiPaddle.x - 2;
    ball.y = aiPaddle.y + aiPaddle.height / 2;
    ball.dx = 2;

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(ball.dx).toBe(-2);
  });

  test('AI paddle should move correctly towards the ball', () => {
    ball.x = aiPaddle.x - 10;
    ball.y = aiPaddle.y - 10;

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    expect(aiPaddle.y).toBe(198);
  });

  test('Game canvas should be cleared before each update', () => {
    // Set a dummy value to the canvas to check if it's cleared
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    update(canvas, ctx, ball, playerPaddle, aiPaddle);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const isCanvasCleared = imageData.every((value) => value === 0);

    expect(isCanvasCleared).toBe(true);
  });

  // Add more tests as needed...
});
