const fs = require('fs');
const {
  applyTransformations,
  countOccurrencesInArray,
  applyUntilRecursive,
  minMaxFromOccurrences,
} = require('./day-14.util');

const { ascSort, arraySum } = require('./day-8.util');

const input = 'OKSBBKHFBPVNOBKHBPCO'.split('');

const instructions = fs
  .readFileSync('./input/day-14.input.txt')
  .toString('utf-8')
  .split('\n')
  .filter((v) => !!v)
  .map((s) => s.split(' -> '))
  .map((s) =>
    s.map((e, i) => {
      if (i === 0) {
        e = e.split('');
      }
      return e;
    })
  );

// const input = 'NNCB'.split('');
// const instructions = [
//   [['C', 'H'], 'B'],
//   [['H', 'H'], 'N'],
//   [['C', 'B'], 'H'],
//   [['N', 'H'], 'C'],
//   [['H', 'B'], 'C'],
//   [['H', 'C'], 'B'],
//   [['H', 'N'], 'C'],
//   [['N', 'N'], 'C'],
//   [['B', 'H'], 'H'],
//   [['N', 'C'], 'B'],
//   [['N', 'B'], 'B'],
//   [['B', 'N'], 'B'],
//   [['B', 'B'], 'N'],
//   [['B', 'C'], 'B'],
//   [['C', 'C'], 'N'],
//   [['C', 'N'], 'C'],
// ];

const ROUNDS = 20;

const instructions20 = instructions.map((instruction, iCount) => {
  console.log('########### instruction', iCount, 'of', instructions.length);
  console.time('instruction' + iCount);
  const newInst = [...instruction];
  let instPolymer = newInst[0];
  for (let i = 0; i < ROUNDS; i++) {
    // console.log('******** ROUND', i, '; current length', instPolymer.length);
    if (instPolymer.length > 10000) {
      let tempPolymer = [];
      const chunkCount = Math.floor(instPolymer.length / 10000) + 1;
      const chunkSize = Math.floor(instPolymer.length / chunkCount) + 1;

      for (let i = 0; i < instPolymer.length; i += chunkSize) {
        // console.log(`start from ${i} to  ${i + chunkSize} (x/${chunkCount})`);
        const chunkPolymer = [...instPolymer.slice(i, i + chunkSize + 1)];
        // console.time('applyTransformations');
        const chunkTransformed = applyTransformations(
          chunkPolymer,
          instructions
        );
        // console.timeEnd('applyTransformations');
        if (i !== 0) {
          tempPolymer.pop();
        }
        tempPolymer = tempPolymer.concat(chunkTransformed);
      }

      instPolymer = tempPolymer;
      // console.log('part done');
    } else {
      instPolymer = applyTransformations(instPolymer, instructions);
    }
  }
  newInst[1] = instPolymer;
  const occs = countOccurrencesInArray(instPolymer);
  newInst[2] = occs;
  console.timeEnd('instruction' + iCount);

  return newInst;
});

console.log(instructions20.map((i) => i[1].length));

const instructions40 = instructions20.map(([mainInst, polymer20]) => {
  const allCounts = {};
  for (let i = 0; i < polymer20.length - 1; i++) {
    const instruction20 = instructions20.find(
      (instr) =>
        instr[0][0] === polymer20[i] && instr[0][1] === polymer20[i + 1]
    );
    if (!instruction20) throw new Error('no instruction20');

    for (const [key, value] of Object.entries(instruction20[2])) {
      allCounts[key] = allCounts[key]
        ? allCounts[key] + value
        : (allCounts[key] = value);
    }

    // do not double count the last one (is also part of first next one)
    if (i !== polymer20.length - 2) {
      allCounts[polymer20[i + 1]] -= 1;
    }
  }

  return [mainInst, allCounts];
});

const polymerCounts = {};
for (let i = 0; i < input.length - 1; i++) {
  const instruction40 = instructions40.find(
    (instr) => instr[0][0] === input[i] && instr[0][1] === input[i + 1]
  );
  if (!instruction40) throw new Error('no instruction40');

  for (const [key, value] of Object.entries(instruction40[1])) {
    polymerCounts[key] = polymerCounts[key]
      ? polymerCounts[key] + value
      : (polymerCounts[key] = value);
  }
  // do not double count the last one (is also part of first next one)
  if (i !== input.length - 2) {
    polymerCounts[input[i + 1]] -= 1;
  }
}

const part2MinMax = minMaxFromOccurrences(polymerCounts);

console.log(
  'part2',
  part2MinMax,
  'sub:',
  part2MinMax.max.val - part2MinMax.min.val
);

// part 1

newPolymer = input;
for (let i = 0; i < 10; i++) {
  newPolymer = applyTransformations(newPolymer, instructions);
}

const occs = countOccurrencesInArray(newPolymer);

if (arraySum(Object.values(occs)) !== newPolymer.length) throw new Error('bad');

const part1MinMax = minMaxFromOccurrences(occs);

console.log(
  'part1',
  part1MinMax,
  'sub:',
  part1MinMax.max.val - part1MinMax.min.val
);
