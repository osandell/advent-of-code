import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const data = eData.split(/\n/).map((row) => {
  let test = row.split("=");
  return {
    sx: parseInt(test[1].split(",")[0]),
    sy: parseInt(test[2].split(":")[0]),
    bx: parseInt(test[3].split(",")[0]),
    by: parseInt(test[4]),
  };
});
console.log(
  "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    data    \x1b[8m\x1b[40m\x1b[0m\n",
  "color: white; background: black; font-weight: bold",
  data
);
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

  // *********************************************************************************

  let result = 0;

  for (let i = 0; i < moveNr; i++) {
    data.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {});
    });
  }

  // let startX = 493;
  let startX = -20;
  let endX = 45;
  let startY = -40;
  let endY = 43;
  // let endX = 503;

  // let endY = 10;

  const drawTile = (x1, y1, x2, y2) => {};

  let highest = 0;

  let dataToRender = [];
  let drawnTile = {};
  for (let iY = startY; iY < endY; iY++) {
    let newRow = [];
    for (let iX = startX; iX <= endX; iX++) {
      let foundSomething = false;
      data.forEach((row, rowIndex) => {
        let distance = Math.abs(row.sx - row.bx) + Math.abs(row.sy - row.by);

        for (let i = 0; i <= distance; i++) {
          for (let j = 0; j <= distance; j++) {
            if (row.sx === iX && row.sy === iY) {
              if (!drawnTile[iX.toString() + ":" + iY.toString()]) {
                drawnTile[iX.toString() + ":" + iY.toString()] = true;
                newRow.push("S");
                foundSomething = true;
              }
            }

            if (row.bx === iX && row.by === iY) {
              if (!drawnTile[iX.toString() + ":" + iY.toString()]) {
                drawnTile[iX.toString() + ":" + iY.toString()] = true;
                newRow.push("B");
                foundSomething = true;
              }
            }

            if (row.sx + i - j === iX && row.sy + j === iY) {
              if (
                !drawnTile[iX.toString() + ":" + iY.toString()] &&
                i - j >= 0
              ) {
                drawnTile[iX.toString() + ":" + iY.toString()] = true;
                newRow.push("#");
                foundSomething = true;
              }
            }
            if (row.sx - i + j === iX && row.sy + j === iY) {
              if (
                !drawnTile[iX.toString() + ":" + iY.toString()] &&
                i - j >= 0
              ) {
                drawnTile[iX.toString() + ":" + iY.toString()] = true;
                newRow.push("#");
                foundSomething = true;
              }
            }
            if (row.sx + i - j === iX && row.sy - j === iY) {
              if (
                !drawnTile[iX.toString() + ":" + iY.toString()] &&
                i - j >= 0
              ) {
                drawnTile[iX.toString() + ":" + iY.toString()] = true;
                newRow.push("#");
                foundSomething = true;
              }
            }
            if (row.sx - i + j === iX && row.sy - j === iY) {
              if (
                !drawnTile[iX.toString() + ":" + iY.toString()] &&
                i - j >= 0
              ) {
                drawnTile[iX.toString() + ":" + iY.toString()] = true;
                newRow.push("#");
                foundSomething = true;
              }
            }
          }
        }
      });

      !foundSomething && newRow.push(".");
    }

    let nrOfCovPoints = 0;
    newRow.forEach((tile) => {
      if (tile === "#") {
        nrOfCovPoints++;
      }
    });

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        nrOfCovPoints    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 169 \n",
      "color: white; background: black; font-weight: bold",
      "",
      nrOfCovPoints,
      iY
    );

    if (nrOfCovPoints > highest) {
      highest = nrOfCovPoints;
    }

    dataToRender.push(newRow);
  }

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      highest    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 190 \n",
    "color: white; background: black; font-weight: bold",
    "",
    highest
  );

  // *********************************************************************************

  return (
    <div>
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
      <div style={{ marginTop: "24px" }}>Result: {result}</div>
    </div>
  );
};
