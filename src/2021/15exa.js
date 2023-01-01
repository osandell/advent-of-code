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

let moves = [
  //   [
  //     [0, -1],
  //     [0, -1],
  //     [0, -1],
  //     [1, 0],
  //     [1, 0],
  //     [1, 0],
  //     [0, 1],
  //     [0, 1],
  //     [0, 1],
  //   ],
  //   [
  //     [0, -1],
  //     [0, -1],
  //     [0, -1],
  //     [1, 0],
  //     [1, 0],
  //     [0, 1],
  //     [0, 1],
  //     [0, 1],
  //     [1, 0],
  //   ],
  //   [
  //     [0, -1],
  //     [0, -1],
  //     [1, 0],
  //     [1, 0],
  //     [0, 1],
  //     [0, 1],
  //   ],
  //   [
  //     [0, -1],
  //     [1, 0],
  //     [1, 0],
  //     [0, 1],
  //   ],

  // 3 steps
  // first right
  [
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 0],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 0],
    [0, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [0, 1],
    [0, 1],
  ],
  [
    [1, 0],
    [0, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 0],
    [0, 1],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 0],
    [1, 0],
  ],
  // first down
  [
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [0, 1],
    [1, 0],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 0],
    [1, 0],
  ],
  [
    [0, 1],
    [1, 0],
    [1, 0],
    [1, 0],
  ],
  [
    [0, 1],
    [1, 0],
    [0, 1],
    [1, 0],
  ],
  [
    [0, 1],
    [1, 0],
    [0, 1],
    [0, 1],
  ],

  //   [
  //     [-1, 0],
  //     [-1, 0],
  //     [0, 1],
  //     [0, 1],
  //     [1, 0],
  //     [1, 0],
  //   ],
  //   [
  //     [-1, 0],
  //     [0, 1],
  //     [0, 1],
  //     [1, 0],
  //   ],
];

let counter = 0;
let reachedEnd = false;
let risk = 0;
while (!reachedEnd) {
  console.log("-------------------");
  //   counter++;
  //   if (counter > 4) {
  //     reachedEnd = true;
  //   }
  let lowestSum = 99999999;
  let bestMove = [];
  moves.forEach((move, index) => {
    // console.log(`index`, index);
    let testPosition = { ...position };
    let isMoveValid = true;
    let sum = 0;
    move.some((step) => {
      if (
        (testPosition.x + step[0] < 0) |
        (testPosition.y + step[1] < 0) |
        (testPosition.y + step[1] > board.length - 1) |
        (testPosition.x + step[0] > board[0].length - 1)
      ) {
        if (
          testPosition.y + step[1] === board.length - 1 &&
          testPosition.x + step[0] > board[0].length - 1
        ) {
          console.log("retuuuuuurn");
          return;
        }
        isMoveValid = false;
      } else {
        testPosition.x += step[0];
        testPosition.y += step[1];
        sum += parseInt(board[testPosition.y][testPosition.x]);
      }
    });

    if (isMoveValid) {
      if (sum < lowestSum) {
        bestMove = move;
        lowestSum = sum;
        console.log(`bestMove`, bestMove);
      }
    }
    console.log(`isMoveValid, move`, isMoveValid, move);
    console.log(`testPosition`, testPosition);
    isMoveValid && console.log(`sum`, sum);
  });

  risk += lowestSum;

  bestMove.forEach((step) => {
    position.x += step[0];
    position.y += step[1];

    if (position.x === board[0].length - 1 && position.y === board.length - 1) {
      reachedEnd = true;
    }
  });
  console.log(`position`, position);
}
console.log(`risk`, risk);
