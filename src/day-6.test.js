const { expect } = require('@jest/globals');
const {
  computeNextGeneration,
  computeMultipleGenerations,
} = require('./day-6.util');

describe('day 6', () => {
  it('should compute next generation', () => {
    // given
    const start = [3, 4, 3, 1, 2];

    // whenn
    const next = computeNextGeneration(start);

    // then
    expect(next).toMatchObject([2, 3, 2, 0, 1]);
  });

  it('should compute next 18 generations manually', () => {
    // given
    const start = [3, 4, 3, 1, 2];

    // when
    let current = start;
    for (let i = 0; i < 18; i++) {
      current = computeNextGeneration(current);
    }

    // then
    expect(current).toMatchObject([
      6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
      8,
    ]);
    expect(current.length).toBe(26);
  });

  it('should compute next 18 generations with helper', () => {
    // given
    const start = [3, 4, 3, 1, 2];

    // when
    const after18 = computeMultipleGenerations(start, 18, 100);

    // then
    expect(after18).toBe(26);
  });

  it('should compute next 18 generations batched', () => {
    // given
    const start = [3, 4, 3, 1, 2];

    // when
    const after18 = computeMultipleGenerations(start, 18, 1);

    // then
    expect(after18).toBe(26);
  });
});
