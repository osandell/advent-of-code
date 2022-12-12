import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

const data = rData.split(/\n/).map((row) => row.split(""));

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

  let nextDoorValues = [];
  let result = 0;

  const check = (y, x, rowIndex, tileIndex) => {
    if (
      data[y] &&
      data[y][x] &&
      data[y][x] === "E" &&
      (data[rowIndex][tileIndex] === "y" || data[rowIndex][tileIndex] === "z")
    ) {
      if (
        data[rowIndex][tileIndex] !== "E" &&
        data[rowIndex][tileIndex].length === 1
      ) {
        nextDoorValues.push({ letter: "E", value: 0 });
      } else {
        nextDoorValues.push({ letter: "", value: 99999999999999999 });
      }
    } else if (data[y] && data[y][x] && data[y][x].length > 1) {
      if (
        data[rowIndex][tileIndex] !== "E" &&
        data[rowIndex][tileIndex].length === 1
      ) {
        nextDoorValues.push({
          letter: data[y][x].split(":")[0],
          value: parseInt(data[y][x].split(":")[1]),
        });
      } else {
        nextDoorValues.push({ letter: "", value: 99999999999999999 });
      }
    } else {
      nextDoorValues.push({ letter: "", value: 99999999999999999 });
    }
  };

  for (let i = 0; i < moveNr; i++) {
    data.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        nextDoorValues = [];
        let lowest = 99999999999999999;
        let lowestIndex = -1;
        if (rowIndex === 3 && tileIndex === 4) {
          // debugger;
        }
        check(rowIndex - 1, tileIndex, rowIndex, tileIndex);
        check(rowIndex + 1, tileIndex, rowIndex, tileIndex);
        check(rowIndex, tileIndex - 1, rowIndex, tileIndex);
        check(rowIndex, tileIndex + 1, rowIndex, tileIndex);

        const alphabet = "abcdefghijklmnopqrstuvwxyzE";
        const thisHeight = alphabet.indexOf(data[rowIndex][tileIndex]);

        for (let i = 0; i < nextDoorValues.length; i++) {
          const targetHeight = alphabet.indexOf(nextDoorValues[i].letter);

          if (
            nextDoorValues[i].value < lowest &&
            targetHeight <= thisHeight + 1
          ) {
            lowest = nextDoorValues[i].value;
            lowestIndex = i;
          }
        }

        if (lowestIndex !== -1) {
          if (data[rowIndex][tileIndex] === "S") {
            let shortestPath = 9999999999999;
            data.forEach((row) => {
              row.forEach((tile) => {
                if (tile.split(":")[0] === "a") {
                  if (tile.split(":")[1] < shortestPath) {
                    shortestPath = tile.split(":")[1];
                  }
                }
              });
            });
            result = shortestPath;
          }

          data[rowIndex][tileIndex] =
            data[rowIndex][tileIndex] +
            `:${(nextDoorValues[lowestIndex].value + 1).toString()}`;
        }
      });
    });
  }

  let dataToRender = [];
  data.forEach((row) => {
    let newRow = [];
    row.forEach((tile) => {
      newRow.push(tile);
    });

    dataToRender.push(newRow);
  });

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
