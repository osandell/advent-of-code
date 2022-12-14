import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

const data = eData
  .split(/\n/)
  .map((row) =>
    row
      .split("->")
      .map((coord) => coord.split(",").map((Number) => parseInt(Number)))
  );

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

  let dataToRender = [];
  // data.forEach((row) => {

  let walls = {};

  data.forEach((wall) => {
    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    wall    \x1b[8m\x1b[40m\x1b[0m\n",
      "color: white; background: black; font-weight: bold",
      wall
    );
    // debugger;
    wall.forEach((coord, index) => {
      if (wall[index + 1] && coord[0] === wall[index + 1][0]) {
        let length = wall[index + 1][1] - coord[1] + 1;
        for (let i = coord[1]; i < coord[1] + length; i++) {
          walls[coord[0] + "," + i] = true;
        }
      }
      if (wall[index + 1] && coord[1] === wall[index + 1][1]) {
        let length = wall[index + 1][0] - coord[0];
        console.log(
          "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    length    \x1b[8m\x1b[40m\x1b[0m\n",
          "color: white; background: black; font-weight: bold",
          length
        );
        if (length < 0) {
          length = length - 1;
          // debugger;
          for (let i = coord[0]; i > coord[0] + length; i--) {
            walls[i + "," + coord[1]] = true;
          }
        } else {
          length = length + 1;
          for (let i = coord[0]; i < coord[0] + length; i++) {
            walls[i + "," + coord[1]] = true;
          }
        }
      }
    });
  });

  for (let i = 0; i < 10; i++) {
    let newRow = [];
    for (let j = 494; j <= 503; j++) {
      let coord = j.toString() + "," + i.toString();
      walls[coord] ? newRow.push("#") : newRow.push(".");
    }

    dataToRender.push(newRow);
  }
  // for (let i = 0; i < 170; i++) {
  //   let newRow = [];
  //   for (let j = 485; j <= 570; j++) {
  //     let coord = j.toString() + "," + i.toString();
  //     walls[coord] ? newRow.push("#") : newRow.push(".");
  //   }

  //   dataToRender.push(newRow);
  // }

  // *********************************************************************************

  return (
    <div>
      <Render
        dataToRender={dataToRender}
        emptyTileIndicator={""}
        shouldRenderBinarily={false}
        shouldInvertX={false}
        shouldInvertY={false}
        sizeX={"30px"}
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
