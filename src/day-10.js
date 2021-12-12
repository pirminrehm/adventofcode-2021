const fs = require('fs');
const {
  computeBracketScore,
  validateBrackets,
  calcMissingBracketsScore,
  calcMissingBracketsIfValid,
} = require('./day-10.util');
const { ascSort } = require('./day-8.util');

const input = fs.readFileSync('./input/day-10.input.txt').toString('utf-8');
const subsystems = input.split('\n').filter((v) => !!v);

const part1 = computeBracketScore(subsystems.map((i) => validateBrackets(i)));

console.log('part1', part1);

const part2 = subsystems
  .map((i) => calcMissingBracketsIfValid(i))
  .filter((v) => !!v)
  .map((b) => calcMissingBracketsScore(b))
  .sort(ascSort);

const part2Middel = part2[Math.floor(part2.length / 2)];

console.log('part2', part2Middel);
