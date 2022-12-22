import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 200;
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

  const [moveNr, setMoveNr] = useState(4000);
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

  for (let i = 0; i < moveNr; i++) {
    let move = path[i];
    if (!isNaN(move)) {
      // if (i === 278) debugger;

      switch (facing) {
        case "right":
          // debugger;
          for (let i = 0; i < move; i++) {
            pos[1]++;
            if (board[pos[0]] && board[pos[0]][pos[1]] === "#") {
              pos[1]--;
              break;
            } else if (board[pos[0]] && board[pos[0]][pos[1]] === " ") {
              let foundBlock = false;
              for (let k = 0; k < board[0].length - 1; k++) {
                if (board[pos[0]][k] === ".") {
                  pos[1] = k;
                  break;
                } else if (board[pos[0]][k] === "#") {
                  pos[1]--;
                  foundBlock = true;
                  break;
                }
              }
              if (foundBlock) break;
            }
          }
          break;
        case "left":
          for (let i = 0; i < move; i++) {
            pos[1]--;
            if (board[pos[0]][pos[1]] === "#") {
              pos[1]++;
              break;
            } else if (board[pos[0]][pos[1]] === " " || pos[1] < 0) {
              let foundBlock = false;
              for (let k = board[0].length; k > 0; k--) {
                if (board[pos[0]][k] === ".") {
                  pos[1] = k;
                  break;
                } else if (board[pos[0]][k] === "#") {
                  pos[1]++;
                  foundBlock = true;
                  break;
                }
              }
              if (foundBlock) break;
            }
          }
          break;
        case "up":
          // debugger;
          for (let i = 0; i < move; i++) {
            pos[0]--;
            if (board[pos[0]] && board[pos[0]][pos[1]] === "#") {
              pos[0]++;
              break;
            } else if (
              (board[pos[0]] && board[pos[0]][pos[1]] === " ") ||
              pos[0] === -1
            ) {
              let foundBlock = false;
              for (let k = board.length - 1; k > 0; k--) {
                if (board[k][pos[1]] === ".") {
                  pos[0] = k;
                  break;
                } else if (board[k][pos[1]] === "#") {
                  pos[0]++;
                  foundBlock = true;
                  break;
                }
              }
              if (foundBlock) break;
            }
          }
          break;
        case "down":
          // debugger;
          for (let i = 0; i < move; i++) {
            pos[0]++;
            if (board[pos[0]] && board[pos[0]][pos[1]] === "#") {
              pos[0]--;
              break;
            } else if (
              (board[pos[0]] && board[pos[0]][pos[1]] === " ") ||
              pos[0] === board.length
            ) {
              let foundBlock = false;
              for (let k = 0; k < board.length; k++) {
                if (board[k][pos[1]] === ".") {
                  pos[0] = k;
                  break;
                } else if (board[k][pos[1]] === "#") {
                  pos[0]--;
                  foundBlock = true;
                  break;
                }
              }
              if (foundBlock) break;
            }
          }
          break;
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
      <div style={{ marginTop: "24px" }}>Move nr: {moveNr}</div>
      <div style={{ marginTop: "24px" }}>posx: {pos[1]}</div>
      <div style={{ marginTop: "24px" }}>posy: {pos[0]}</div>
      <div style={{ marginTop: "24px" }}>facing: {facing}</div>
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
