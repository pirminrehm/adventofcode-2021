const fs = require('fs');

const input = fs
  .readFileSync('./input/day-3.input.txt')
  .toString('utf-8')
  .split('\n')
  .filter((v) => !!v);

const oxygen = findByBitList(input, 0, true);
console.log(oxygen);
const co2 = findByBitList(input, 0, false);
console.log(co2);

function findByBitList(arr, pos, findMostCommon) {
  if (pos > input[0].length) throw new Error('out of range');
  const ones = arr.reduce((acc, curr) => {
    acc += parseInt(curr[pos], 10);
    return acc;
  }, 0);
  let common = ones >= arr.length / 2 ? 1 : 0;
  common = !findMostCommon ? 1 - common : common;
  const filteredArr = arr.filter((bin) => bin[pos] === common.toString());
  if (filteredArr.length === 1) {
    return filteredArr[0];
  }
  return findByBitList(filteredArr, ++pos, findMostCommon);
}

const oxygenNum = parseInt(oxygen, 2);
const co2Num = parseInt(co2, 2);
console.log(oxygenNum);
console.log(co2Num);

console.log('product', oxygenNum * co2Num);
