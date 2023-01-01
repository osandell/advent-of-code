let drawnNumbers = [
  7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
  20, 8, 19, 3, 26, 1,
];

let boards = `22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`;

boards = boards.split("\n\n");

let boardsFinished = [];

boards.forEach((board, index) => {
  boards[index] = boards[index].split("\n");

  boards[index].forEach((row, index2) => {
    boards[index][index2] = row.split(/[ ]+/);

    boards[index][index2].forEach((number, index3) => {
      boards[index][index2][index3] = {
        number: parseInt(number),
        marked: false,
      };
    });
  });

  boardsFinished.push(false);
});

let BreakException = {};

try {
  drawnNumbers.forEach((drawnNumber) => {
    boards.forEach((board, boardIndex) => {
      board.forEach((row, rowIndex) => {
        row.forEach((boardPosition, boardPositionIndex) => {
          if (drawnNumber === boardPosition.number) {
            let currentPosition =
              boards[boardIndex][rowIndex][boardPositionIndex];

            currentPosition.marked = true;

            let isRowFullyMarked = true;
            boards[boardIndex][rowIndex].forEach((boardPosition) => {
              if (!boardPosition.marked) {
                isRowFullyMarked = false;
              }
            });

            let oneColumnIsFullyMarked = false;
            for (let i = 0; i < 5; i++) {
              let isColumnFullyMarked = true;
              boards[boardIndex].forEach((row) => {
                if (!row[i].marked) {
                  isColumnFullyMarked = false;
                }
              });
              if (isColumnFullyMarked) {
                console.log(`drawnNumber`, drawnNumber);
                oneColumnIsFullyMarked = true;
              }
            }

            // console.log(`drawnNumber`, drawnNumber);
            // if (drawnNumber === 13) {
            //   console.log(`boards`, boards[1]);
            // }

            if (isRowFullyMarked || oneColumnIsFullyMarked) {
              let sumOfUnmarkedPositions = 0;

              boards[boardIndex].forEach((row) => {
                row.forEach((boardPosition) => {
                  if (!boardPosition.marked) {
                    sumOfUnmarkedPositions += boardPosition.number;
                  }
                });
              });

              boardsFinished[boardIndex] = true;

              console.log(`boardsFinished`, boardsFinished);

              let isAllBoardsFinished = true;

              boardsFinished.forEach((element) => {
                if (!element) {
                  isAllBoardsFinished = false;
                }
              });

              if (isAllBoardsFinished) {
                console.log(`drawnNumber`, drawnNumber);
                console.log(sumOfUnmarkedPositions * drawnNumber);
                throw BreakException;
              }
            }
          }
        });
      });
    });
  });
} catch (e) {
  if (e !== BreakException) throw e;
}

// boards.forEach((board, index) => {
//   console.log(board);
// });
