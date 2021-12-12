const computeMultipleGenerations = (population, generations, chunkSize) => {
  let length = 0;

  const after200Generations = [
    51693574, 46403689, 43533881, 39025282, 36406203, 33033571, 30306966,
    28018483, 25247007,
  ];

  populationloop: for (let s = 0; s < population.length; s += chunkSize) {
    let chunk = population.slice(s, s + chunkSize);
    const startTime = new Date().getTime();
    console.log(
      `start: chunk ${(s + chunkSize) / chunkSize}/${Math.round(
        population.length / chunkSize
      )}`
    );

    for (let i = 0; i < generations; i++) {
      if (generations - i === 200) {
        console.log('calc via map last 200 for current length:', chunk.length);
        const lengths = chunk.map((n) => after200Generations[n]);
        console.log('summ all length');
        const sum = lengths.reduce((acc, curr) => (acc += curr), 0);

        length += sum;
        logInfo(startTime, sum);
        continue populationloop;
      } else {
        console.log(`start: generation ${i}`);
        chunk = computeNextGeneration(chunk);
      }
    }

    length += chunk.length;
    logInfo(startTime, chunk.length);
  }

  return length;
};

function logInfo(startTime, chunkLength) {
  console.log(
    `  end: chunk after ${
      (new Date().getTime() - startTime) / 1000
    }s with length ${chunkLength}`
  );
}

function computeNextGeneration(current) {
  const newNext = [];
  const next = current.map((c) => {
    if (c === 0) {
      newNext.push(8);
      return 6;
    }
    return c - 1;
  });
  return next.concat(newNext);
}

module.exports = {
  computeNextGeneration,
  computeMultipleGenerations,
};
