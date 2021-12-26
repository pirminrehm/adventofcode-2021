const { expect } = require('@jest/globals');
const { applyTransformations } = require('./day-14.util');

describe('day 10', () => {
  const input = 'NNCB'.split('');
  const instructions = [
    [['C', 'H'], 'B'],
    [['H', 'H'], 'N'],
    [['C', 'B'], 'H'],
    [['N', 'H'], 'C'],
    [['H', 'B'], 'C'],
    [['H', 'C'], 'B'],
    [['H', 'N'], 'C'],
    [['N', 'N'], 'C'],
    [['B', 'H'], 'H'],
    [['N', 'C'], 'B'],
    [['N', 'B'], 'B'],
    [['B', 'N'], 'B'],
    [['B', 'B'], 'N'],
    [['B', 'C'], 'B'],
    [['C', 'C'], 'N'],
    [['C', 'N'], 'C'],
  ];

  it('should compute one polymer', () => {
    // when
    const result = applyTransformations(input, instructions).newInput;

    // then
    expect(result.join('')).toBe('NCNBCHB');
  });

  it('should compute multiple polymer', () => {
    // when
    let result = input;
    for (let i = 0; i < 4; i++) {
      result = applyTransformations(result, instructions).newInput;
    }

    // then
    expect(result.join('')).toBe(
      'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB'
    );
  });
});
