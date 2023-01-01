let rows = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

rows = rows.split("\n");

rows.forEach((row, rowIndex) => {
  rows[rowIndex] = row.split("");

  rows[rowIndex].forEach((column, columnIndex) => {
    rows[rowIndex][columnIndex] = parseInt(column);
  });
});

let board = rows;
let nrOfFlashes = 0;
let done = false;
let index = 0;
// console.log(`board`, board);
while (!done) {
  let allHaveFlashed = true;
  let newCycle = true;
  let flashWentOff = true;
  let innerCycle = 0;
  while (flashWentOff) {
    // console.log(`innerCycle`, innerCycle);
    flashWentOff = false;
    board.forEach((y, yIndex) => {
      y.forEach((x, xIndex) => {
        if (newCycle) {
          x++;
        }
        if (x > 9) {
          board[yIndex][xIndex] = -1000;
          flashWentOff = true;
          // console.log("flash went off", innerCycle, yIndex, xIndex);
          nrOfFlashes++;
          if (index === 1 && yIndex === 1) {
            // console.log(
            //   `board[yIndex - 1][xIndex - 1]`,
            //   board[yIndex - 1][xIndex - 1]
            // );
            // console.log(`yIndex, xIndex`, yIndex, xIndex);
          }
          if (yIndex > 0 && xIndex > 0) {
            board[yIndex - 1][xIndex - 1] = board[yIndex - 1][xIndex - 1] + 1;
          }
          if (yIndex > 0) {
            board[yIndex - 1][xIndex] = board[yIndex - 1][xIndex] + 1;
          }
          if (yIndex > 0 && xIndex < y.length - 1) {
            board[yIndex - 1][xIndex + 1] = board[yIndex - 1][xIndex + 1] + 1;
          }
          if (xIndex > 0) {
            board[yIndex][xIndex - 1] = board[yIndex][xIndex - 1] + 1;
          }
          if (xIndex < y.length - 1) {
            board[yIndex][xIndex + 1] = board[yIndex][xIndex + 1] + 1;
          }
          if (yIndex < board.length - 1 && xIndex > 0) {
            board[yIndex + 1][xIndex - 1] = board[yIndex + 1][xIndex - 1] + 1;
          }
          if (yIndex < board.length - 1) {
            board[yIndex + 1][xIndex] = board[yIndex + 1][xIndex] + 1;
          }
          if (yIndex < board.length - 1 && xIndex < y.length - 1) {
            board[yIndex + 1][xIndex + 1] = board[yIndex + 1][xIndex + 1] + 1;
          }
        } else {
          board[yIndex][xIndex] = x;
        }
      });
    });

    if (newCycle) {
      newCycle = false;
    }
    innerCycle++;
  }
  board.forEach((y, yIndex) => {
    y.forEach((x, xIndex) => {
      if (x < 0) {
        board[yIndex][xIndex] = 0;
      } else {
        allHaveFlashed = false;
      }
    });
  });
  if (allHaveFlashed) {
    done = true;
  }
  allHaveFlashed && console.log(`cycle`, index + 1);

  index++;

  // console.log("----------" + (index + 1) + "----------");
  // console.log(`board`, board);
}
console.log(`nrOfFlashes`, nrOfFlashes);
