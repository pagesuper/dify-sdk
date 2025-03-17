import assert from 'power-assert';

describe('increment', () => {
  test('get 1 at initial', () => {
    const count = 0 + 1;
    assert.equal(count, 1);
  });
});
