let board = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

board = board.split("\n");

board.forEach((x, index) => {
  board[index] = x.split("");
});

let position = { x: 0, y: 0 };

let counter = 0;
let reachedEnd = false;
let risk = 0;

let winningMove;

let lowestSum = 99999999;
for (let index = 0; index < 1000000; index++) {
  for (let index2 = 0; index2 < 2; index2++) {
    let bestMove = [];

    // console.log((index >>> 0).toString(2));
    let move = index2
      ? (index >>> 0).toString(2)
      : (index >>> 0).toString(2).substring(1);

    move = move.split("");
    move.forEach((step, index) => {
      // console.log(`step`, step);
      move[index] = parseInt(step) ? [1, 0] : [0, 1];
    });
    // console.log(`index`, index);
    let testPosition = { ...position };
    let sum = 0;
    move.some((step) => {
      // console.log(`step`, step);
      if (
        (testPosition.x + step[0] < 0) |
        (testPosition.y + step[1] < 0) |
        (testPosition.y + step[1] > board.length - 1) |
        (testPosition.x + step[0] > board[0].length - 1)
      ) {
        return;
      } else {
        testPosition.x += step[0];
        testPosition.y += step[1];
        sum += parseInt(board[testPosition.y][testPosition.x]);

        if (
          testPosition.y === board.length - 1 &&
          testPosition.x === board[0].length - 1
        ) {
          if (sum < lowestSum) {
            bestMove = move;
            lowestSum = sum;
            winningMove = move;
          }

          // console.log("retuuuuuurn");
          return;
        }
      }
    });
    // console.log(`testposition`, testPosition);
  }
}
// console.log(`risk`, risk);

console.log(`winningMoves`, winningMove);
console.log(`lowestSum`, lowestSum);
