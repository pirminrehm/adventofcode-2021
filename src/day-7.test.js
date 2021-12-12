const { expect } = require('@jest/globals');
const { computeBestFit, computeBestFitPart2 } = require('./day-7.util');

describe('day 7', () => {
  it('should compute best case', () => {
    // given
    const start = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

    // whenn
    const result = computeBestFit(start);

    // then
    expect(result.best).toBe(37);
    expect(result.besti).toBe(2);
  });

  it('should compute best case for part 2', () => {
    // given
    const start = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

    // whenn
    const result = computeBestFitPart2(start);

    // then
    expect(result.best).toBe(168);
    expect(result.besti).toBe(5);
  });
});
