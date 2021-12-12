const openingBrackets = ['(', '[', '{', '<'];
const closingBrackets = [')', ']', '}', '>'];
const closeToOpenDict = { ')': '(', ']': '[', '}': '{', '>': '<' };
const openToCloseDict = { '(': ')', '[': ']', '{': '}', '<': '>' };

/**
 *
 * @param {string} bracketString
 * @returns
 */
function validateBrackets(bracketString) {
  const bracketList = bracketString.split('');
  const stack = [];

  for (let bracket of bracketList) {
    if (openingBrackets.includes(bracket)) {
      stack.push(bracket);
      continue;
    }
    if (closingBrackets.includes(bracket)) {
      const lastBracket = stack.pop();
      if (closeToOpenDict[bracket] !== lastBracket) {
        return {
          isCorrupt: true,
          foundBracket: bracket,
        };
      }
      continue;
    }
    throw new Error(`bad symbol "${bracket}"`);
  }

  return { isCorrupt: false, stack };
}

/**
 *
 * @param { { isCorrupt: boolean, foundBracket: ")" | "}" | "]" | ">" }[]} validations
 */
function computeBracketScore(validations) {
  const valMap = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  return validations
    .filter((v) => v.isCorrupt)
    .reduce((acc, curr) => (acc += valMap[curr.foundBracket]), 0);
}

/**
 *
 * @param {string} bracketString
 * @returns
 */
function calcMissingBracketsIfValid(bracketString) {
  const validation = validateBrackets(bracketString);
  if (validation.isCorrupt) return;

  return [...validation.stack].reverse().map((s) => openToCloseDict[s]);
}

function calcMissingBracketsScore(bracketList) {
  const valMap = { ')': 1, ']': 2, '}': 3, '>': 4 };
  let score = 0;

  for (bracket of bracketList) {
    score *= 5;
    score += valMap[bracket];
  }

  return score;
}

module.exports = {
  validateBrackets,
  computeBracketScore,
  calcMissingBracketsScore,
  calcMissingBracketsIfValid,
};
