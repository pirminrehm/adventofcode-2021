const fs = require('fs');
const input = fs.readFileSync('./input/quest-6.input.txt').toString('utf-8');
const { computeMultipleGenerations } = require('./quest-6.util');
const inputList = input
  .split(',')
  .filter((v) => !!v)
  .map((v) => parseInt(v, 10));

// const after200Generations = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((s) =>
//   computeMultipleGenerations([s], 200, 1)
// );
// console.log(after100Generations);

console.log('part 1:', computeMultipleGenerations(inputList, 80, 1000));
console.log('part 2:', computeMultipleGenerations(inputList, 256, 1000));
