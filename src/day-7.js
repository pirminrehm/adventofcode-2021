const fs = require('fs');
const { computeBestFit, computeBestFitPart2 } = require('./day-7.util');
const input = fs.readFileSync('./input/day-7.input.txt').toString('utf-8');
const inputList = input
  .split(',')
  .filter((v) => !!v)
  .map((v) => parseInt(v, 10));

computeBestFit(inputList);
computeBestFitPart2(inputList);
