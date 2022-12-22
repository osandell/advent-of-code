import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

// const MAP_SIZE = 200;
const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let initialX;
const board = eData
  .split(/\n\n/)[0]
  .split("\n")
  .map((row) => {
    let tiles = row.split("").map((tile) => (tile === "-" ? " " : tile));

    if (!initialX) {
      tiles.forEach((tile, i) => {
        if (tile === ".") {
          if (!initialX) initialX = i;
        }
      });
    }

    for (let i = tiles.length; i < MAP_SIZE; i++) {
      tiles.push(" ");
    }

    return tiles;
  });

let sides = [{}, {}, {}, {}, {}, {}];

/// 1
for (let i = 0; i < MAP_SIZE; i++) {
  if (board[0][i] === "." || board[0][i] === "#") {
    sides[0].topLeft = [0, i];
    break;
  }
}
for (let i = MAP_SIZE; i > 0; i--) {
  if (board[0][i] === "." || board[0][i] === "#") {
    sides[0].topRight = [0, i];
    break;
  }
}
for (let i = 0; i < board.length; i++) {
  if (board[i][0] === "." || board[i][0] === "#") {
    sides[0].bottomLeft = [i - 1, sides[0].topLeft[1]];
    sides[0].bottomRight = [i - 1, sides[0].topRight[1]];
    sides[1].topLeft = [i, 0];
    sides[1].topRight = [i, i - 1];
    sides[1].bottomLeft = [i + i - 1, 0];
    sides[1].bottomRight = [i + i - 1, i - 1];
    sides[2].topLeft = [i, 0 + i];
    sides[2].topRight = [i, i - 1 + i];
    sides[2].bottomLeft = [i + i - 1, 0 + i];
    sides[2].bottomRight = [i + i - 1, i - 1 + i];
    sides[3].topLeft = [i, 0 + i * 2];
    sides[3].topRight = [i, i - 1 + i * 2];
    sides[3].bottomLeft = [i + i - 1, 0 + i * 2];
    sides[3].bottomRight = [i + i - 1, i - 1 + i * 2];
    sides[4].topLeft = [i * 2, 0 + i * 2];
    sides[4].topRight = [i * 2, i - 1 + i * 2];
    sides[4].bottomLeft = [i * 2 + i - 1, 0 + i * 2];
    sides[4].bottomRight = [i * 2 + i - 1, i - 1 + i * 2];
    sides[5].topLeft = [i * 2, 0 + i * 3];
    sides[5].topRight = [i * 2, i - 1 + i * 3];
    sides[5].bottomLeft = [i * 2 + i - 1, 0 + i * 3];
    sides[5].bottomRight = [i * 2 + i - 1, i - 1 + i * 3];
    break;
  }
}

let cubeSize = sides[1].bottomLeft[0] - sides[1].topLeft[0] + 1;

const pathString = eData.split(/\n\n/)[1].split("");

const path = [];

// debugger;
let nrStartIndex = -1;
pathString.forEach((position, i) => {
  let digit = parseInt(position);

  if (!isNaN(digit)) {
    if (nrStartIndex === -1) {
      nrStartIndex = i;
    }
  } else {
    if (nrStartIndex != -1) {
      const nr = parseInt(pathString.slice(nrStartIndex, i).join(""));
      path.push(nr);
      nrStartIndex = -1;
    }
    path.push(position);
  }
});

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const isAdjecent = (part1, part2) =>
  (part1[0] === part2[0] ||
    part1[0] === part2[0] - 1 ||
    part1[0] === part2[0] + 1) &&
  (part1[1] === part2[1] ||
    part1[1] === part2[1] - 1 ||
    part1[1] === part2[1] + 1);

export default () => {
  let currMove = 0;

  let facing = "right";
  let pos = [0, initialX];

  // let totalNrOfMoves = 0;
  // for (let i = 0; i < data.length; i++) {
  //   const move = data[i];
  //   const nrOfMovesInCurrentDirection = move[1];
  //   for (let i = 0; i < nrOfMovesInCurrentDirection; i++) {
  //     totalNrOfMoves++;
  //   }
  // }
  const totalNrOfMoves = 99999999999999999999999999;

  const [moveNr, setMoveNr] = useState(0);
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  const moveNrRef = React.useRef(moveNr);
  moveNrRef.current = moveNr;

  const startPlaying = () => {
    if (moveNr < totalNrOfMoves) {
      const timer = setInterval(() => {
        moveNrRef.current < totalNrOfMoves
          ? setMoveNr(moveNrRef.current + 1)
          : clearInterval(timer);
      }, 30);
    }
  };

  let result = 0;
  let currSide;

  const setCurrSide = () => {
    if (
      pos[0] >= sides[0].topLeft[0] &&
      pos[0] <= sides[0].bottomLeft[0] &&
      pos[1] >= sides[0].topLeft[1] &&
      pos[1] <= sides[0].topRight[1]
    ) {
      currSide = 0;
    } else if (
      pos[0] >= sides[1].topLeft[0] &&
      pos[0] <= sides[1].bottomLeft[0] &&
      pos[1] >= sides[1].topLeft[1] &&
      pos[1] <= sides[1].topRight[1]
    ) {
      currSide = 1;
    } else if (
      pos[0] >= sides[2].topLeft[0] &&
      pos[0] <= sides[2].bottomLeft[0] &&
      pos[1] >= sides[2].topLeft[1] &&
      pos[1] <= sides[2].topRight[1]
    ) {
      currSide = 2;
    } else if (
      pos[0] >= sides[3].topLeft[0] &&
      pos[0] <= sides[3].bottomLeft[0] &&
      pos[1] >= sides[3].topLeft[1] &&
      pos[1] <= sides[3].topRight[1]
    ) {
      currSide = 3;
    } else if (
      pos[0] >= sides[4].topLeft[0] &&
      pos[0] <= sides[4].bottomLeft[0] &&
      pos[1] >= sides[4].topLeft[1] &&
      pos[1] <= sides[4].topRight[1]
    ) {
      currSide = 4;
    } else if (
      pos[0] >= sides[5].topLeft[0] &&
      pos[0] <= sides[5].bottomLeft[0] &&
      pos[1] >= sides[5].topLeft[1] &&
      pos[1] <= sides[5].topRight[1]
    ) {
      currSide = 5;
    }
  };

  for (let i = 0; i < moveNr; i++) {
    setCurrSide();

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      currSide    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 164 \n",
      "color: white; background: black; font-weight: bold",
      "",
      currSide
    );

    // if (i === 8) debugger;
    let move = path[i];
    if (!isNaN(move)) {
      let stepsLeft = move;
      while (stepsLeft > 0) {
        let iTimes = stepsLeft;
        switch (facing) {
          case "right":
            // debugger;
            for (let i = 0; i < iTimes; i++) {
              stepsLeft--;
              setCurrSide();
              pos[1]++;
              // debugger;
              if (board[pos[0]][pos[1]] === "#") {
                pos[1]--;
                break;
              } else if (pos[1] > sides[currSide].topRight[1]) {
                // debugger;
                let switchedSide = false;
                let relativePos;
                switch (currSide) {
                  case 0:
                    relativePos = pos[0] - cubeSize;
                    if (
                      board[sides[5].topRight[0]][
                        sides[5].topRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[1]--;
                      break;
                    } else {
                      pos[0] = sides[5].topRight[0];
                      pos[1] = sides[5].topRight[1] - relativePos;
                      facing = "left";
                      switchedSide = true;
                      break;
                    }
                  case 3:
                    relativePos = pos[0] - cubeSize;
                    if (
                      board[sides[5].topRight[0]][
                        sides[5].topRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[1]--;
                      break;
                    } else {
                      pos[0] = sides[5].topRight[0];
                      pos[1] = sides[5].topRight[1] - relativePos;
                      facing = "down";
                      switchedSide = true;
                      break;
                    }
                  case 5:
                    relativePos = pos[0] - cubeSize * 2;
                    if (
                      board[sides[0].bottomRight[0] - relativePos][
                        sides[0].topRight[1]
                      ] === "#"
                    ) {
                      pos[1]--;
                      break;
                    } else {
                      pos[0] = sides[0].bottomRight[0] - relativePos;
                      pos[1] = sides[0].topRight[1];
                      facing = "left";
                      switchedSide = true;
                      break;
                    }
                }
                if (switchedSide) break;
              }
            }
            break;
          case "left":
            for (let i = 0; i < iTimes; i++) {
              stepsLeft--;
              setCurrSide();
              pos[1]--;
              if (board[pos[0]][pos[1]] === "#") {
                pos[1]++;
                break;
              } else if (board[pos[0]][pos[1]] === " " || pos[1] < 0) {
                // debugger;
                let switchedSide = false;
                let relativePos;
                switch (currSide) {
                  case 0:
                    relativePos = pos[0];
                    if (
                      board[sides[2].topRight[0]][
                        sides[2].topRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[1]++;
                      break;
                    } else {
                      pos[0] = sides[2].topRight[0];
                      pos[1] = sides[2].topRight[1] - relativePos;
                      facing = "down";
                      switchedSide = true;
                      break;
                    }
                  case 1:
                    relativePos = pos[0] - cubeSize;
                    if (
                      board[sides[5].bottomRight[0]][
                        sides[5].topRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[1]++;
                      break;
                    } else {
                      pos[0] = sides[5].bottomRight[0];
                      pos[1] = sides[5].topRight[1] - relativePos;
                      facing = "up";
                      switchedSide = true;
                      break;
                    }
                  case 4:
                    relativePos = pos[0] - cubeSize * 2;
                    if (
                      board[sides[2].bottomRight[0]][
                        sides[2].bottomRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[1]++;
                      break;
                    } else {
                      pos[0] = sides[2].bottomRight[0];
                      pos[1] = sides[2].bottomRight[1] - relativePos;
                      facing = "up";
                      switchedSide = true;
                      break;
                    }
                }
                if (switchedSide) break;
              }
            }
            break;
          case "up":
            // debugger;
            for (let i = 0; i < iTimes; i++) {
              stepsLeft--;
              setCurrSide();
              pos[0]--;
              if (board[pos[0]] && board[pos[0]][pos[1]] === "#") {
                pos[0]++;
                break;
              } else if (
                (board[pos[0]] && board[pos[0]][pos[1]] === " ") ||
                pos[0] === -1
              ) {
                // debugger;
                let switchedSide = false;
                let relativePos;
                switch (currSide) {
                  case 0:
                    // debugger;
                    relativePos = pos[1] - cubeSize * 2;
                    if (
                      board[sides[1].topRight[0]][
                        sides[1].topRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[0]++;
                      break;
                    } else {
                      pos[0] = sides[1].topRight[0];
                      pos[1] = sides[1].topRight[1] - relativePos;
                      facing = "down";
                      switchedSide = true;
                      break;
                    }
                  case 1:
                    // debugger;
                    relativePos = pos[1];
                    if (
                      board[sides[0].topRight[0]][
                        sides[0].topRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[0]++;
                      break;
                    } else {
                      pos[0] = sides[0].topRight[0];
                      pos[1] = sides[0].topRight[1] - relativePos;
                      facing = "down";
                      switchedSide = true;
                      break;
                    }
                  case 2:
                    // debugger;
                    relativePos = pos[1] - cubeSize;
                    if (
                      board[sides[0].topRight[0] + relativePos][
                        sides[0].topLeft[1]
                      ] === "#"
                    ) {
                      pos[0]++;
                      break;
                    } else {
                      pos[0] = sides[0].topRight[0] + relativePos;
                      pos[1] = sides[0].topLeft[1];
                      facing = "right";
                      switchedSide = true;
                      break;
                    }
                  case 5:
                    // debugger;
                    relativePos = pos[1] - cubeSize * 3;
                    if (
                      board[sides[3].bottomRight[0] - relativePos][
                        sides[3].topRight[1]
                      ] === "#"
                    ) {
                      pos[0]++;
                      break;
                    } else {
                      pos[0] = sides[3].bottomRight[0] - relativePos;
                      pos[1] = sides[3].topRight[1];
                      facing = "left";
                      switchedSide = true;
                      break;
                    }
                }
                if (switchedSide) break;
              }
            }
            break;
          case "down":
            // debugger;
            for (let i = 0; i < iTimes; i++) {
              stepsLeft--;
              setCurrSide();
              pos[0]++;
              if (board[pos[0]] && board[pos[0]][pos[1]] === "#") {
                pos[0]--;
                break;
              } else if (
                (board[pos[0]] && board[pos[0]][pos[1]] === " ") ||
                pos[0] === board.length
              ) {
                // debugger;
                let switchedSide = false;
                let relativePos;
                switch (currSide) {
                  case 1:
                    // debugger;
                    relativePos = pos[1];
                    if (
                      board[sides[4].bottomRight[0]][
                        sides[4].bottomRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[0]--;
                      break;
                    } else {
                      pos[0] = sides[4].bottomRight[0];
                      pos[1] = sides[4].bottomRight[1] - relativePos;
                      facing = "up";
                      switchedSide = true;
                      break;
                    }
                  case 2:
                    // debugger;
                    relativePos = pos[1];
                    if (
                      board[sides[4].bottomLeft[0] - relativePos][
                        sides[4].bottomLeft[1]
                      ] === "#"
                    ) {
                      pos[0]--;
                      break;
                    } else {
                      pos[0] = sides[4].bottomLeft[0] - relativePos;
                      pos[1] = sides[4].bottomLeft[1];
                      facing = "right";
                      switchedSide = true;
                      break;
                    }
                  case 4:
                    // debugger;
                    relativePos = pos[1] - cubeSize * 2;
                    if (
                      board[sides[1].bottomRight[0]][
                        sides[1].bottomRight[1] - relativePos
                      ] === "#"
                    ) {
                      pos[0]--;
                      break;
                    } else {
                      pos[0] = sides[1].bottomRight[0];
                      pos[1] = sides[1].bottomRight[1] - relativePos;
                      facing = "up";
                      switchedSide = true;
                      break;
                    }
                  case 5:
                    // debugger;
                    relativePos = pos[1] - cubeSize * 3;
                    if (
                      board[sides[1].bottomLeft[0] + 1][
                        sides[1].bottomLeft[1] + relativePos
                      ] === "#"
                    ) {
                      pos[0]--;
                      break;
                    } else {
                      pos[0] = sides[1].bottomLeft[0];
                      pos[1] = sides[1].bottomLeft[1] + relativePos;
                      facing = "right";
                      switchedSide = true;
                      break;
                    }
                }
                if (switchedSide) break;
              }
            }
            break;
        }
      }
    } else {
      // debugger;
      switch (move) {
        case "L":
          switch (facing) {
            case "right":
              facing = "up";
              break;
            case "left":
              facing = "down";
              break;
            case "up":
              facing = "left";
              break;
            case "down":
              facing = "right";
              break;
          }
          break;
        case "R":
          switch (facing) {
            case "right":
              facing = "down";
              break;
            case "left":
              facing = "up";
              break;
            case "up":
              facing = "right";
              break;
            case "down":
              facing = "left";
              break;
          }
          break;
        case "U":
          switch (facing) {
            case "right":
              facing = "left";
              break;
            case "left":
              facing = "right";
              break;
            case "up":
              facing = "down";
              break;
            case "down":
              facing = "up";
              break;
          }
          break;
        case "D":
          switch (facing) {
            case "right":
              facing = "right";
              break;
            case "left":
              facing = "left";
              break;
            case "up":
              facing = "up";
              break;
            case "down":
              facing = "down";
              break;
          }
          break;
      }
    }
  }

  let dataToRender = [];
  board.forEach((row, y) => {
    let newRow = [];
    row.forEach((tile, x) => {
      if (y === pos[0] && x === pos[1]) {
        switch (facing) {
          case "right":
            tile = ">";
            break;
          case "left":
            tile = "<";
            break;
          case "up":
            tile = "^";
            break;
          case "down":
            tile = "v";
            break;
        }
      }
      newRow.push(tile);
    });

    dataToRender.push(newRow);
  });

  // *********************************************************************************

  return (
    <div>
      <div style={{ marginTop: "24px" }}>
        <button
          onClick={() => moveNr > 0 && setMoveNr(0)}
          style={{
            marginRight: "8px",
            color: moveNr > 0 ? "black" : "lightGray",
          }}
        >
          Beginning
        </button>
        <button
          onClick={() => moveNr > 9 && setMoveNr(moveNr - 10)}
          style={{
            marginRight: "8px",
            color: moveNr > 9 ? "black" : "lightGray",
          }}
        >
          Prev 10
        </button>
        <button
          onClick={() => moveNr > 0 && setMoveNr(moveNr - 1)}
          style={{
            marginRight: "8px",
            color: moveNr > 0 ? "black" : "lightGray",
          }}
        >
          Prev
        </button>
        <button
          onClick={() => startPlaying()}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          Play
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves && setMoveNr(moveNr + 1)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          Next
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves - 9 && setMoveNr(moveNr + 10)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves - 9 ? "black" : "lightGray",
          }}
        >
          Next 10
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves && setMoveNr(totalNrOfMoves)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          End
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "24px" }}>Move nr: {moveNr}</div>
        <div style={{ marginTop: "24px" }}>posx: {pos[1]}</div>
        <div style={{ marginTop: "24px" }}>posy: {pos[0]}</div>
        <div style={{ marginTop: "24px" }}>facing: {facing}</div>
      </div>
      <Render
        dataToRender={dataToRender}
        emptyTileIndicator={""}
        shouldRenderBinarily={false}
        shouldInvertX={false}
        shouldInvertY={false}
        sizeX={"20px"}
        sizeY={"15px"}
        isCenterOrigin={false}
      />
    </div>
  );
};
