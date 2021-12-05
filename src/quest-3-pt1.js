const fs = require('fs');

const input = fs
  .readFileSync('./input/quest-3.input.txt')
  .toString('utf-8')
  .split('\n')
  .filter((v) => !!v);

const onesPerPlace = input.reduce((acc, curr) => {
  for (let i = 0; i < curr.length; i++) {
    acc[i] += parseInt(curr[i], 10);
  }
  return acc;
}, Array(input[0].length).fill(0));

const mostCommonBit = onesPerPlace.map((o) => (o > input.length / 2 ? 1 : 0));
const invertMostCommonBit = mostCommonBit.map((b) => 1 - b);

console.log(onesPerPlace);
console.log(mostCommonBit);
console.log(invertMostCommonBit);

const mostCommonBitToNumber = parseInt(mostCommonBit.join(''), 2);
const invertMostCommonBitToNumber = parseInt(invertMostCommonBit.join(''), 2);
console.log(mostCommonBitToNumber);
console.log(invertMostCommonBitToNumber);

console.log('product', mostCommonBitToNumber * invertMostCommonBitToNumber);
