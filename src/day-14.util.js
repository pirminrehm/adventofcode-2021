function minMaxFromOccurrences(occs) {
  let max = { val: Number.MIN_SAFE_INTEGER, key: -1 };
  let min = { val: Number.MAX_SAFE_INTEGER, key: -1 };

  for (const [key, value] of Object.entries(occs)) {
    if (value > max.val) {
      max = { val: value, key };
    }
    if (value < min.val) {
      min = { val: value, key };
    }
  }
  return { min, max };
}

function applyTransformations(input, instructions) {
  // const newInput = [...input];
  let newInput = [...input];

  for (let i = 0, add = 0; i < input.length - 1; i++) {
    // if (i % 1000 === 0) {
    //   console.log(i);
    // }
    const instruction = instructions.find(
      (instr) => instr[0][0] === input[i] && instr[0][1] === input[i + 1]
    );

    if (!instruction) throw new Error('no instruction');
    newInput.splice(i + 1 + add++, 0, instruction[1]);
  }

  return newInput;
}

function countOccurrencesInArray(array) {
  return array.reduce(
    (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
    {}
  );
}

module.exports = {
  countOccurrencesInArray,
  applyTransformations,
  minMaxFromOccurrences,
};
