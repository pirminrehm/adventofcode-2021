const { expect } = require('@jest/globals');
const {
  getNrIfKnown,
  getDisplayValueByLine,
  getSignalMapping,
} = require('./day-8.util');

describe('day 8', () => {
  it('should compute correct numbers for input', () => {
    // given
    const input = [
      'be',
      'cfbegad',
      'cbdgef',
      'fgaecd',
      'cgeb',
      'fdcge',
      'agebfd',
      'fecdb',
      'fabcd',
      'edb',
    ];

    // whenn
    const result = input.map((i) => getNrIfKnown(i));

    // then
    expect(result).toMatchObject([
      1,
      8,
      undefined,
      undefined,
      4,
      undefined,
      undefined,
      undefined,
      undefined,
      7,
    ]);
  });

  it('should compute correct numbers for input', () => {
    // given
    const input = [
      'acedgfb',
      'cdfbe',
      'gcdfa',
      'fbcad',
      'dab',
      'cefabd',
      'cdfgeb',
      'eafb',
      'cagedb',
      'ab',
    ];

    // whenn
    const result = getSignalMapping(input);

    // then
    expect(result).toMatchObject([8, 5, 2, 3, 7, 9, 6, 4, 0, 1]);
  });

  it('should compute correct numbers for input', () => {
    // given
    const line = [
      [
        'acedgfb',
        'cdfbe',
        'gcdfa',
        'fbcad',
        'dab',
        'cefabd',
        'cdfgeb',
        'eafb',
        'cagedb',
        'ab',
      ],
      ['cdfeb', 'fcadb', 'cdfeb', 'cdbaf'],
    ];

    // whenn
    const result = getDisplayValueByLine(line);

    // then
    expect(result).toBe(5353);
  });
});
