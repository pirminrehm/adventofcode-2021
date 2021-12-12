const { expect } = require('@jest/globals');
const { ascSort } = require('./day-8.util');
const { findMinima, findBasinsAndReturnSizes } = require('./day-9.util');

describe('day 9', () => {
  it('should find minimas', () => {
    // given
    const heightmap = [
      [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
      [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
      [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
      [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
      [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ];

    // whenn
    const minima = findMinima(heightmap);

    // then
    expect(minima).toMatchObject([
      { row: 0, col: 1, val: 1 },
      { row: 0, col: 9, val: 0 },
      { row: 2, col: 2, val: 5 },
      { row: 4, col: 6, val: 5 },
    ]);
  });

  it('should find basins', () => {
    // given
    const heightmap = [
      [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
      [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
      [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
      [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
      [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ];

    // whenn
    const basins = findBasinsAndReturnSizes(heightmap).sort(ascSort);

    // then
    console.log(basins);
    expect(basins).toMatchObject([3, 9, 9, 14]);
  });
});
