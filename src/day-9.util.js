/**
 *
 * @param {number[][]} map
 */
function findMinima(map) {
  const minima = [];

  for (let r = 0; r < map.length; r++) {
    const row = map[r];
    for (let c = 0; c < row.length; c++) {
      const cell = row[c];
      const top = map[r - 1]?.[c] ?? Number.MAX_SAFE_INTEGER;
      const bottom = map[r + 1]?.[c] ?? Number.MAX_SAFE_INTEGER;
      const left = map[r]?.[c - 1] ?? Number.MAX_SAFE_INTEGER;
      const right = map[r]?.[c + 1] ?? Number.MAX_SAFE_INTEGER;

      if (cell < top && cell < bottom && cell < left && cell < right) {
        minima.push({ row: r, col: c, val: cell });
      }
    }
  }
  return minima;
}

function findBasinsAndReturnSizes(map) {
  const minima = findMinima(map);
  const basinSizes = minima.map((m) => computeBasinSizeForMinimum(m, map));

  return basinSizes;
}

/**
 *
 * @param { {row: number, col: number, val: numer}} minimum
 * @param {number[][]} map
 */
function computeBasinSizeForMinimum(minimum, map) {
  const checkMap = Array.from({ length: map.length }, () =>
    Array(map[0].length).fill(false)
  );

  // inplace changes to checkMap!
  markHigherValuesAround(minimum, map, checkMap);

  const size = checkMap.reduce(
    (acc, row) => (acc += row.reduce((acc, cell) => (acc += +cell), 0)),
    0
  );
  return size;
}

/**
 *
 * @param { {row: number, col: number, val: numer}} cell
 * @param {number[][]} map
 * @param {boolean[][]} checkMap
 */
function markHigherValuesAround({ row, col, val }, map, checkMap) {
  checkMap[row][col] = true;
  const top = map[row - 1]?.[col] ?? Number.MIN_SAFE_INTEGER;
  const bottom = map[row + 1]?.[col] ?? Number.MIN_SAFE_INTEGER;
  const left = map[row]?.[col - 1] ?? Number.MIN_SAFE_INTEGER;
  const right = map[row]?.[col + 1] ?? Number.MIN_SAFE_INTEGER;

  if (val < top && !checkMap[row - 1][col] && top !== 9) {
    markHigherValuesAround({ row: row - 1, col, val: top }, map, checkMap);
  }

  if (val < bottom && !checkMap[row + 1][col] && bottom !== 9) {
    markHigherValuesAround({ row: row + 1, col, val: bottom }, map, checkMap);
  }

  if (val < left && !checkMap[row][col - 1] && left !== 9) {
    markHigherValuesAround({ row, col: col - 1, val: left }, map, checkMap);
  }

  if (val < right && !checkMap[row][col + 1] && right !== 9) {
    markHigherValuesAround({ row, col: col + 1, val: right }, map, checkMap);
  }

  return;
}

module.exports = {
  findMinima,
  findBasinsAndReturnSizes,
};
