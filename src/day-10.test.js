const { expect } = require('@jest/globals');
const {
  validateBrackets,
  computeBracketScore,
  calcMissingBracketsIfValid,
  calcMissingBracketsScore,
} = require('./day-10.util');

describe('day 10', () => {
  const input = [
    '[({(<(())[]>[[{[]{<()<>>',
    '[(()[<>])]({[<{<<[]>>(',
    '{([(<{}[<>[]}>{[]{[(<()>', // Expected ], but found } instead
    '(((({<>}<{<{<>}{[]{[]{}',
    '[[<[([]))<([[{}[[()]]]', // Expected ], but found ) instead
    '[{[{({}]{}}([{[{{{}}([]', // Expected ), but found ] instead
    '{<[[]]>}<{[{[{[]{()[[[]',
    '[<(<(<(<{}))><([]([]()', // Expected >, but found ) instead
    '<{([([[(<>()){}]>(<<{{', // Expected ], but found > instead.
    '<{([{{}}[<[[[<>{}]]]>[]]',
  ];

  it('should find corrupted subsystems', () => {
    // when
    const result = input.map((i) => validateBrackets(i));

    // then
    expect(result).toMatchObject([
      { isCorrupt: false },
      { isCorrupt: false },
      { isCorrupt: true, foundBracket: '}' },
      { isCorrupt: false },
      { isCorrupt: true, foundBracket: ')' },
      { isCorrupt: true, foundBracket: ']' },
      { isCorrupt: false },
      { isCorrupt: true, foundBracket: ')' },
      { isCorrupt: true, foundBracket: '>' },
      { isCorrupt: false },
    ]);
  });

  it('should calculate part1 score for corrupted subsystems', () => {
    // when
    const result = input.map((i) => validateBrackets(i));
    const calc = computeBracketScore(result);

    // then
    expect(calc).toBe(26397);
  });

  it('should calculate missing brackets', () => {
    // when
    const result = input
      .map((i) => calcMissingBracketsIfValid(i))
      .filter((v) => !!v);

    // then
    expect(result).toMatchObject([
      ['}', '}', ']', ']', ')', '}', ')', ']'],
      [')', '}', '>', ']', '}', ')'],
      ['}', '}', '>', '}', '>', ')', ')', ')', ')'],
      [']', ']', '}', '}', ']', '}', ']', '}', '>'],
      [']', ')', '}', '>'],
    ]);
  });

  it('should calculate score for brackets', () => {
    // input
    const brackets = [
      ['}', '}', ']', ']', ')', '}', ')', ']'],
      [')', '}', '>', ']', '}', ')'],
      ['}', '}', '>', '}', '>', ')', ')', ')', ')'],
      [']', ']', '}', '}', ']', '}', ']', '}', '>'],
      [']', ')', '}', '>'],
    ];

    // when
    const result = brackets.map((b) => calcMissingBracketsScore(b));

    // then
    expect(result).toMatchObject([288957, 5566, 1480781, 995444, 294]);
  });
});
