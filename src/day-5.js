const fs = require('fs');
const { parse } = require('path/posix');
const input = fs.readFileSync('./input/day-5.input.txt').toString('utf-8');
const rows = input.split('\n').filter((v) => !!v);
const sea = Array.from({ length: 999 }, () => Array(999).fill(0));

const computeDiagonal = true;

// const parsedRows = inputRowToCoordinates([
//   '0,9 -> 5,9',
//   '8,0 -> 0,8',
//   '9,4 -> 3,4',
//   '2,2 -> 2,1',
//   '7,0 -> 7,4',
//   '6,4 -> 2,0',
//   '0,9 -> 2,9',
//   '3,4 -> 1,4',
//   '0,0 -> 8,8',
//   '5,5 -> 8,2',
// ]);

const parsedRows = inputRowToCoordinates(rows);

parsedRows.forEach((row) => {
  const x1 = row[0][0],
    y1 = row[0][1],
    x2 = row[1][0],
    y2 = row[1][1];

  if (x1 === x2 || y1 === y2) {
    updateSeaVerticalHorizontal(x1, y1, x2, y2);
  } else if (computeDiagonal) {
    updateSeaDiagonal(x1, y1, x2, y2);
  }
});

const count = sea.reduce(
  (acc, row) =>
    (acc += row.reduce((acc, curr) => (acc += curr >= 2 ? 1 : 0), 0)),
  0
);

// printSeaPretty(sea);
console.log(count);

function updateSeaVerticalHorizontal(x1, y1, x2, y2) {
  [x1, x2] = swapLowerFirst(x1, x2);
  [y1, y2] = swapLowerFirst(y1, y2);

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      sea[y][x] += 1;
    }
  }
}

function updateSeaDiagonal(x1, y1, x2, y2) {
  const xDinstance = Math.abs(x1 - x2);
  const yDinstance = Math.abs(x1 - x2);
  const xDirection = x1 > x2 ? -1 : 1;
  const yDirection = y1 > y2 ? -1 : 1;
  if (xDinstance != yDinstance) throw new Error('not diagonal');

  for (let i = 0; i <= xDinstance; i++) {
    const y = y1 + i * yDirection;
    const x = x1 + i * xDirection;
    sea[y][x] += 1;
  }
}

function inputRowToCoordinates(rows) {
  return rows.map((row) =>
    row.split(' -> ').map((el) => el.split(',').map((n) => parseInt(n, 10)))
  );
}

function swapLowerFirst(n1, n2) {
  return n1 > n2 ? [n2, n1] : [n1, n2];
}

function printSeaPretty(sea) {
  sea.forEach((row) =>
    console.log(row.map((d) => (d === 0 ? '.' : d)).join(''))
  );
}
