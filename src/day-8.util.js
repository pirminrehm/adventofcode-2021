/**
 *
 * @param {string[]} arr
 * @returns {number[]}
 */
function getSignalMapping(inputSignals) {
  /**
   *    aaaa
   *   b    c
   *   b    c
   *    dddd
   *   e    f
   *   e    f
   *    gggg
   */
  const inputSignalsSplit = inputSignals.map((s) => s.split(''));
  const inputSignalsSorted = inputSignalsSplit.map((s) =>
    s.sort(ascSort).join('')
  );
  const knownMapping = inputSignalsSplit.map((i) => getNrIfKnown(i));
  const signal1 = inputSignalsSplit[knownMapping.indexOf(1)];
  const signal4 = inputSignalsSplit[knownMapping.indexOf(4)];
  const signal7 = inputSignalsSplit[knownMapping.indexOf(7)];
  const signal8 = inputSignalsSplit[knownMapping.indexOf(8)];

  // 3 has 5 digits and is only who has tow intersections with 1 -> 5-3 = 3 val
  const signal3 = validate(
    inputSignalsSplit
      .filter((s) => s.length === 5)
      .filter((s) => subtractSignals(s, signal1).length === 3),
    'signal3'
  )[0];

  const a = validate(subtractSignals(signal7, signal1), 'a');
  const g = validate(subtractSignals(signal3, a, signal4), 'g');
  const d = validate(subtractSignals(signal3, signal1, a, g), 'd');
  const b = validate(subtractSignals(signal4, signal1, d), 'b');

  // using all 5-val signals and removing all known vals we get f
  const f = validate(
    validate(
      inputSignalsSplit
        .filter((s) => s.length === 5)
        .map((s) => subtractSignals(s, a, g, d, b))
        .filter((s) => s.length === 1),
      'f'
    )[0],
    'f'
  );

  const c = validate(subtractSignals(signal1, f), 'c');
  const e = validate(subtractSignals(signal8, a, b, c, d, f, g), 'e');

  const signal2 = [a[0], c[0], d[0], e[0], g[0]];
  const signal5 = [a[0], b[0], d[0], f[0], g[0]];
  const signal6 = [a[0], b[0], d[0], e[0], f[0], g[0]];
  const signal9 = [a[0], b[0], c[0], d[0], f[0], g[0]];
  const signal0 = [a[0], b[0], c[0], e[0], f[0], g[0]];

  const mapping = [
    signal0,
    signal1,
    signal2,
    signal3,
    signal4,
    signal5,
    signal6,
    signal7,
    signal8,
    signal9,
  ].map((s) => s.sort(ascSort).join(''));

  return inputSignalsSorted.map((s) => mapping.indexOf(s));
}

// subtract two signals
function subtractSignals(...args) {
  if (args.length === 2) {
    return subtractSignal(args[0], args[1]);
  }
  const last = args.pop();
  return subtractSignal(subtractSignals(...args), last);
}

// subtract two signals
function subtractSignal(a, b) {
  const result = [...a];
  for (let char of b) {
    const index = result.indexOf(char);
    if (index !== -1) {
      result.splice(index, 1);
    }
  }
  return result;
}

function validate(res, what) {
  if (res?.length !== 1) throw new Error(`${what} computation failed`);
  return res;
}

function getDisplayValueByLine(line) {
  const inputSignals = line[0].map((s) => s.split('').sort(ascSort).join(''));
  const displaySignals = line[1].map((s) => s.split('').sort(ascSort).join(''));
  const mapping = getSignalMapping(inputSignals);

  const mappedDisplay = displaySignals.map(
    (d) => mapping[inputSignals.indexOf(d)]
  );

  return parseInt(mappedDisplay.join(''), 10);
}

function getNrIfKnown(nr) {
  switch (nr.length) {
    case 3:
      return 7;
    case 2:
      return 1;
    case 4:
      return 4;
    case 7:
      return 8;
    default:
      return undefined;
  }
}

function ascSort(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}

function arraySum(a) {
  return a.reduce((acc, curr) => (acc += curr), 0);
}

module.exports = {
  getSignalMapping,
  getNrIfKnown,
  getDisplayValueByLine,
  arraySum,
  ascSort,
};
