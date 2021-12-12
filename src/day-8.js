const fs = require('fs');
const {
  getNrIfKnown,
  getSignalMapping,
  arraySum,
  getDisplayValueByLine,
} = require('./day-8.util');
const input = fs.readFileSync('./input/day-8.input.txt').toString('utf-8');
const inputLines = input
  .split('\n')
  .filter((v) => !!v)
  .map((line) => line.split(' | ').map((signals) => signals.split(' ')));

const part1 = inputLines.reduce(
  (acc, curr) =>
    (acc += curr[1].map((v) => getNrIfKnown(v)).filter((v) => !!v).length),
  0
);
console.log('part 1:', part1);

const part2 = arraySum(inputLines.map((i) => getDisplayValueByLine(i)));
console.log('part 2:', part2);
