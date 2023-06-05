const { moveBall } = require('../src/pong');

describe('Pong Game', () => {
  test('Ball should move correctly', () => {
    const ball = { x: 100, y: 100, dx: 2, dy: 2 };
    moveBall(ball);

    expect(ball.x).toBe(102);
    expect(ball.y).toBe(102);
  });
});
