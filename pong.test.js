const { getAIMove } = require('./pong');

describe('Pong Game', () => {
  test('AI should make a valid move', async () => {
    const aiMove = await getAIMove();
    expect(aiMove).toBeGreaterThanOrEqual(0);
    expect(aiMove).toBeLessThanOrEqual(400);
  });
});
