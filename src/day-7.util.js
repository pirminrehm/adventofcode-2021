const computeBestFit = (x) => {
  const y = Array.from(new Array(x.length).keys());

  x.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
  const min = Math.min(...x);
  const max = Math.max(...x);
  const median = x[Math.floor(x.length / 2)];
  const mean = Math.round(sum(x) / x.length);

  console.log('min', 'max', 'median', 'mean');
  console.log(min, max, median, mean);

  let best = max * x.length;
  let besti;

  for (let i = min; i <= max; i++) {
    const diff = calcDiff(x, i);
    if (diff < best) {
      best = diff;
      besti = i;
    }
  }

  console.log('best', best, 'for', besti);

  return { best, besti };
};

const computeBestFitPart2 = (x) => {
  const y = Array.from(new Array(x.length).keys());

  // x.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
  const min = Math.min(...x);
  const max = Math.max(...x);
  const median = x[Math.floor(x.length / 2)];
  const mean = Math.round(sum(x) / x.length);

  console.log('min', 'max', 'median', 'mean');
  console.log(min, max, median, mean);

  let best = Number.MAX_VALUE;
  let besti;

  for (let i = min; i <= max; i++) {
    const diff = calcDiffGaussSum(x, i);
    if (diff < best) {
      best = diff;
      besti = i;
    }
  }

  console.log('best', best, 'for', besti);

  return { best, besti };
};

module.exports = {
  computeBestFit,
  computeBestFitPart2,
};

function sum(a) {
  return a.reduce((acc, curr) => (acc += curr), 0);
}

function calcDiff(list, num) {
  return sum(list.map((x) => Math.abs(x - num)));
}

function calcDiffGaussSum(list, num) {
  return sum(list.map((x) => gaussSum(Math.abs(x - num))));
}

function gaussSum(num) {
  if (num < 0) throw new Error('bad number');
  if (num === 0) return 0;

  return num + gaussSum(num - 1);
}
