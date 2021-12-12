const fs = require('fs');
const { arraySum, ascSort } = require('./day-8.util');
const { findMinima, findBasinsAndReturnSizes } = require('./day-9.util');
const input = fs.readFileSync('./input/day-9.input.txt').toString('utf-8');
const heightmap = input
  .split('\n')
  .filter((v) => !!v)
  .map((line) => line.split('').map((num) => parseInt(num, 10)));

const part1 = arraySum(findMinima(heightmap).map((m) => m.val + 1));

console.log('part1', part1);

const heightmap2 = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
];

const part2 = findBasinsAndReturnSizes(heightmap).sort(ascSort);

const best3 = part2.splice(part2.length - 3);

console.log('part2', best3[0] * best3[1] * best3[2]);
