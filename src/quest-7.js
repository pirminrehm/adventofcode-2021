const fs = require('fs');
const { computeBestFit, computeBestFitPart2 } = require('./quest-7.util');
const input = fs.readFileSync('./input/quest-7.input.txt').toString('utf-8');
const inputList = input
  .split(',')
  .filter((v) => !!v)
  .map((v) => parseInt(v, 10));

computeBestFit(inputList);
computeBestFitPart2(inputList);
