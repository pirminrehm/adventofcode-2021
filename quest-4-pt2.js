function arrToChunks(inputArray, perChunk) {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

const fs = require('fs');
const input = fs.readFileSync('quest-3.input.txt').toString('utf-8');
const rows = input.split('\n').filter((v) => !!v);
const bingoNums = rows.splice(0, 1)[0].split(',');

const rowsParsed = rows.map((r) => r.trim().split(/\D+/g));
const boards = arrToChunks(rowsParsed, 5);
const boardsStates = Array.from({ length: boards.length }, () =>
  Array.from({ length: boards[0].length }, () =>
    Array(boards[0][0].length).fill(false)
  )
);
const boardHasWon = Array(boards.length).fill(false);
let lastBoardWon = -1;

for (num of bingoNums) {
  updateBoardsAndCheck(num);
}

let secret = 0;
for (let r = 0; r < lastBoardWon.board.length; r++) {
  for (let i = 0; i < lastBoardWon.board[r].length; i++) {
    if (!lastBoardWon.boardState[r][i]) {
      secret += parseInt(lastBoardWon.board[r][i]);
    }
  }
}

secret *= lastBoardWon.num;

console.log(lastBoardWon.index);
console.log(lastBoardWon.board);
console.log(lastBoardWon.boardState);
console.log(secret.toString());
return;

function updateBoardsAndCheck(mark) {
  boardLoop: for (const [b, board] of boards.entries()) {
    if (boardHasWon[b]) continue boardLoop;
    const boardState = boardsStates[b];
    for (const [r, row] of board.entries()) {
      const found = row.indexOf(mark);
      if (found !== -1) {
        boardState[r][found] = true;
        if (checkBoardStateForBingo(boardState)) {
          boardHasWon[b] = true;
          lastBoardWon = {
            index: b,
            num: mark,
            board: boards[b],
            boardState: boardState,
          };
        }
        continue boardLoop;
      }
    }
  }
  return false;
}

function checkBoardStateForBingo(board) {
  const rowIsTrue = board.map((row) => row.every((v) => v)).some((v) => v);
  const colIsTrue = transpose(board)
    .map((row) => row.every((v) => v))
    .some((v) => v);

  return rowIsTrue || colIsTrue;
}

function transpose(arr) {
  return arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
}
