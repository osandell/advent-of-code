import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 200;
// const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let initialX;
const board = rData
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

sides[0].topLeft = [0, 50];
sides[0].topRight = [0, 99];
sides[0].bottomLeft = [49, 50];
sides[0].bottomRight = [49, 99];
sides[2].topLeft = [100, 0];
sides[2].topRight = [100, 49];
sides[2].bottomLeft = [149, 0];
sides[2].bottomRight = [149, 49];
sides[1].topLeft = [150, 0];
sides[1].topRight = [150, 49];
sides[1].bottomLeft = [199, 0];
sides[1].bottomRight = [199, 49];
sides[3].topLeft = [50, 50];
sides[3].topRight = [50, 99];
sides[3].bottomLeft = [99, 50];
sides[3].bottomRight = [99, 99];
sides[4].topLeft = [100, 50];
sides[4].topRight = [100, 99];
sides[4].bottomLeft = [149, 50];
sides[4].bottomRight = [149, 99];
sides[5].topLeft = [0, 100];
sides[5].topRight = [0, 149];
sides[5].bottomLeft = [49, 100];
sides[5].bottomRight = [49, 149];

let cubeSize = sides[1].bottomLeft[0] - sides[1].topLeft[0] + 1;

const pathString = rData.split(/\n\n/)[1].split("");

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

  const [moveNr, setMoveNr] = useState(380);
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
  let visited = {};

  const setCurrSide = () => {
    visited[`${pos[0]}:${pos[1]}`] = true;

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

  for (let ii = 0; ii < moveNr; ii++) {
    setCurrSide();

    // if (ii === 196) debugger;
    let move = path[ii];
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
                //debugger;
                let switchedSide = false;
                let relativePos;
                switch (currSide) {
                  case 1:
                    // Up on 4
                    // debugger;

                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    relativePos = pos[0] - cubeSize * 3;
                    if (
                      board[sides[4].bottomRight[0]][
                        sides[4].bottomLeft[1] + relativePos
                      ] === "#"
                    ) {
                      pos[1]--;
                      break;
                    } else {
                      pos[0] = sides[4].bottomRight[0];
                      pos[1] = sides[4].bottomLeft[1] + relativePos;
                      facing = "up";
                      switchedSide = true;
                      break;
                    }
                  case 4:
                    // debugger;
                    //left on 5
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    relativePos = pos[0] - cubeSize * 2;
                    if (
                      board[sides[5].bottomRight[0] - relativePos][
                        sides[5].topRight[1]
                      ] === "#"
                    ) {
                      pos[1]--;
                      break;
                    } else {
                      pos[0] = sides[5].bottomRight[0] - relativePos;
                      pos[1] = sides[5].topRight[1];
                      facing = "left";
                      switchedSide = true;
                      break;
                    }
                  case 3:
                    // debugger;
                    // up on 5
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    relativePos = pos[0] - cubeSize;
                    if (
                      board[sides[5].bottomRight[0]][
                        sides[5].bottomLeft[1] + relativePos
                      ] === "#"
                    ) {
                      pos[1]--;
                      break;
                    } else {
                      pos[0] = sides[5].bottomRight[0];
                      pos[1] = sides[5].bottomLeft[1] + relativePos;
                      facing = "up";
                      switchedSide = true;
                      break;
                    }
                  case 5:
                    // debugger;
                    // left on 4
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    relativePos = pos[0];
                    if (
                      board[sides[4].bottomRight[0] - relativePos][
                        sides[4].topRight[1]
                      ] === "#"
                    ) {
                      pos[1]--;
                      break;
                    } else {
                      pos[0] = sides[4].bottomRight[0] - relativePos;
                      pos[1] = sides[4].topRight[1];
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
                    // debugger;
                    //right on 2
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    relativePos = pos[0];
                    if (
                      board[sides[2].bottomLeft[0] - relativePos][
                        sides[2].topLeft[1]
                      ] === "#"
                    ) {
                      pos[1]++;
                      break;
                    } else {
                      pos[0] = sides[2].bottomLeft[0] - relativePos;
                      pos[1] = sides[2].topLeft[1];
                      facing = "right";
                      switchedSide = true;
                      break;
                    }
                  case 1:
                    // down on 0
                    // debugger;
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    relativePos = pos[0] - cubeSize * 3;
                    if (
                      board[sides[0].topRight[0]][
                        sides[0].topLeft[1] + relativePos
                      ] === "#"
                    ) {
                      pos[1]++;
                      break;
                    } else {
                      pos[0] = sides[0].topRight[0];
                      pos[1] = sides[0].topLeft[1] + relativePos;
                      facing = "down";
                      switchedSide = true;
                      break;
                    }
                  case 2:
                    // debugger;
                    // right on 0 !!
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    relativePos = pos[0] - cubeSize * 2;
                    if (
                      board[sides[0].bottomLeft[0] - relativePos][
                        sides[0].bottomLeft[1]
                      ] === "#"
                    ) {
                      pos[1]++;
                      break;
                    } else {
                      pos[0] = sides[0].bottomLeft[0] - relativePos;
                      pos[1] = sides[0].bottomLeft[1];
                      facing = "right";
                      switchedSide = true;
                      break;
                    }
                  case 3:
                    // debugger;
                    // down on 2
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    relativePos = pos[0] - cubeSize;
                    if (
                      board[sides[2].topRight[0]][
                        sides[2].topLeft[1] + relativePos
                      ] === "#"
                    ) {
                      pos[1]++;
                      break;
                    } else {
                      pos[0] = sides[2].topRight[0];
                      pos[1] = sides[2].topLeft[1] + relativePos;
                      facing = "down";
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
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    // debugger;
                    relativePos = pos[1] - cubeSize;
                    if (
                      board[sides[1].topLeft[0] + relativePos][
                        sides[1].topLeft[1]
                      ] === "#"
                    ) {
                      pos[0]++;
                      break;
                    } else {
                      pos[0] = sides[1].topLeft[0] + relativePos;
                      pos[1] = sides[1].topLeft[1];
                      facing = "right";
                      switchedSide = true;
                      break;
                    }
                  case 2:
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    // debugger;
                    // right on 3
                    relativePos = pos[1];
                    if (
                      board[sides[3].topLeft[0] + relativePos][
                        sides[3].topLeft[1]
                      ] === "#"
                    ) {
                      pos[0]++;
                      break;
                    } else {
                      pos[0] = sides[3].topLeft[0] + relativePos;
                      pos[1] = sides[3].topLeft[1];
                      facing = "right";
                      switchedSide = true;
                      break;
                    }
                  case 5:
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    // debugger;
                    // up on 1
                    relativePos = pos[1] - cubeSize * 2;
                    if (
                      board[sides[1].bottomLeft[0]][
                        sides[1].bottomLeft[1] + relativePos
                      ] === "#"
                    ) {
                      pos[0]++;
                      break;
                    } else {
                      pos[0] = sides[1].bottomLeft[0];
                      pos[1] = sides[1].bottomLeft[1] + relativePos;
                      facing = "up";
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
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    // debugger;
                    // down on 5
                    relativePos = pos[1];
                    if (
                      board[sides[5].topRight[0]][
                        sides[5].topLeft[1] + relativePos
                      ] === "#"
                    ) {
                      pos[0]--;
                      break;
                    } else {
                      pos[0] = sides[5].topRight[0];
                      pos[1] = sides[5].topLeft[1] + relativePos;
                      facing = "down";
                      switchedSide = true;
                      break;
                    }
                  case 4:
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    // debugger;
                    // left on 1
                    relativePos = pos[1] - cubeSize;
                    if (
                      board[sides[1].topRight[0] + relativePos][
                        sides[1].bottomRight[1]
                      ] === "#"
                    ) {
                      pos[0]--;
                      break;
                    } else {
                      pos[0] = sides[1].topRight[0] + relativePos;
                      pos[1] = sides[1].bottomRight[1];
                      facing = "left";
                      switchedSide = true;
                      break;
                    }
                  case 5:
                    console.log(
                      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                        i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 219 \n",
                      "color: white; background: black; font-weight: bold",
                      "",
                      ii
                    );
                    // debugger;
                    // left on 3
                    relativePos = pos[1] - cubeSize * 2;
                    if (
                      board[sides[3].topRight[0] + relativePos][
                        sides[3].bottomRight[1]
                      ] === "#"
                    ) {
                      pos[0]--;
                      break;
                    } else {
                      pos[0] = sides[3].topRight[0] + relativePos;
                      pos[1] = sides[3].bottomRight[1];
                      facing = "left";
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
      if (visited[`${y}:${x}`]) tile = "X";
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
