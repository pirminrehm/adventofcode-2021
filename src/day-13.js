const fs = require('fs');
const { fold } = require('./day-13.util');

const { ascSort, arraySum } = require('./day-8.util');

const input = fs
  .readFileSync('./input/day-13.input.txt')
  .toString('utf-8')
  .split('\n')
  .filter((v) => !!v);

const points = input
  .filter((i) => !i.startsWith('fold'))
  .map((i) => i.split(',').map((n) => parseInt(n, 10)));
const folds = input
  .filter((i) => i.startsWith('fold'))
  .map((f) => f.replace('fold along ', '').split('='));

const xPoints = points.flatMap((p) => p[0]);
const yPoints = points.flatMap((p) => p[1]);

const world = Array.from({ length: Math.max(...yPoints) + 1 }, () =>
  Array(Math.max(...xPoints) + 1).fill(false)
);

for (let point of points) {
  world[point[1]][point[0]] = true;
}

const newWorld = fold(world, folds[0]);

console.log(
  'part1',
  arraySum(newWorld.map((row) => row.reduce((acc, curr) => (acc += +curr), 0)))
);

let currWorld = world;
for (let folding of folds) {
  currWorld = fold(currWorld, folding);
}

// print world
for (let row of currWorld) {
  console.log(row.map((r) => (r ? '#' : '.')).join(' '));
}
