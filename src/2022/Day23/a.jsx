import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 100;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const dataOrg = rData.split(/\n/).map((row) => row.split(""));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

let data = [];
for (let i = 0; i < MAP_SIZE; i++) {
  let row = [];
  for (let j = 0; j < MAP_SIZE; j++) {
    row.push(".");
  }
  data.push(row);
}

export default () => {
  let directionArray = ["north", "south", "west", "east"];
  const rotateDirectionArray = () => {
    directionArray.push(directionArray.shift());
  };

  let elves = {};
  dataOrg.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile === "#") {
        elves[`${rowIndex},${tileIndex}`] = {
          suggestedMove: null,
          suggestedMoveCoords: null,
          nextMove: null,
        };
      }
    });
  });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      elves    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 46 \n",
    "color: white; background: black; font-weight: bold",
    "",
    elves
  );

  let currMove = 0;

  const totalNrOfMoves = 99999999999999999999999999;

  const [moveNr, setMoveNr] = useState(3000);
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

  // *********************************************************************************

  let result = 0;
  let theMove;

  for (let currMove = 0; currMove < moveNr; currMove++) {
    let didMove = false;
    let suggestedMoveCoords = {};
    Object.keys(elves).forEach((key) => {
      let y = parseInt(key.split(",")[0]);
      let x = parseInt(key.split(",")[1]);

      let foundSuggestion = false;

      if (
        !elves[`${y - 1},${x}`] &&
        !elves[`${y - 1},${x - 1}`] &&
        !elves[`${y - 1},${x + 1}`] &&
        !elves[`${y + 1},${x}`] &&
        !elves[`${y + 1},${x + 1}`] &&
        !elves[`${y + 1},${x - 1}`] &&
        !elves[`${y},${x - 1}`] &&
        !elves[`${y},${x + 1}`]
      ) {
      } else {
        for (let i = 0; i < 4; i++) {
          switch (directionArray[i]) {
            case "north":
              if (
                // data[y - 1] &&
                // data[y - 1][x] &&
                // data[y - 1][x + 1] &&
                // data[y - 1][x - 1] &&
                !elves[`${y - 1},${x}`] &&
                !elves[`${y - 1},${x - 1}`] &&
                !elves[`${y - 1},${x + 1}`] &&
                !foundSuggestion
              ) {
                elves[key].suggestedMove = "N";
                elves[key].suggestedMoveCoords = [y - 1, x];
                if (!suggestedMoveCoords[`${y - 1},${x}`])
                  suggestedMoveCoords[`${y - 1},${x}`] = 1;
                else suggestedMoveCoords[`${y - 1},${x}`] += 1;
                foundSuggestion = true;
              }
              break;
            case "south":
              if (
                // data[y + 1] &&
                // data[y + 1][x] &&
                // data[y + 1][x + 1] &&
                // data[y + 1][x - 1] &&
                !elves[`${y + 1},${x}`] &&
                !elves[`${y + 1},${x + 1}`] &&
                !elves[`${y + 1},${x - 1}`] &&
                !foundSuggestion
              ) {
                elves[key].suggestedMove = "S";
                elves[key].suggestedMoveCoords = [y + 1, x];
                if (!suggestedMoveCoords[`${y + 1},${x}`])
                  suggestedMoveCoords[`${y + 1},${x}`] = 1;
                else suggestedMoveCoords[`${y + 1},${x}`] += 1;
                foundSuggestion = true;
              }
              break;
            case "west":
              if (
                // data[y + 1] &&
                // data[y - 1] &&
                // data[y][x - 1] &&
                // data[y - 1][x - 1] &&
                // data[y + 1][x - 1] &&
                !elves[`${y},${x - 1}`] &&
                !elves[`${y - 1},${x - 1}`] &&
                !elves[`${y + 1},${x - 1}`] &&
                !foundSuggestion
              ) {
                elves[key].suggestedMove = "W";
                elves[key].suggestedMoveCoords = [y, x - 1];
                if (!suggestedMoveCoords[`${y},${x - 1}`])
                  suggestedMoveCoords[`${y},${x - 1}`] = 1;
                else suggestedMoveCoords[`${y},${x - 1}`] += 1;
                foundSuggestion = true;
              }
              break;
            case "east":
              if (
                // data[y - 1] &&
                // data[y + 1] &&
                // data[y][x + 1] &&
                // data[y - 1][x + 1] &&
                // data[y + 1][x + 1] &&
                !elves[`${y},${x + 1}`] &&
                !elves[`${y - 1},${x + 1}`] &&
                !elves[`${y + 1},${x + 1}`] &&
                !foundSuggestion
              ) {
                elves[key].suggestedMove = "E";
                elves[key].suggestedMoveCoords = [y, x + 1];
                if (!suggestedMoveCoords[`${y},${x + 1}`])
                  suggestedMoveCoords[`${y},${x + 1}`] = 1;
                else suggestedMoveCoords[`${y},${x + 1}`] += 1;
                foundSuggestion = true;
              }
              break;
          }
        }
      }
    });
    // if (currMove === 2) debugger;

    // Someone already suggested this move?
    Object.keys(elves).forEach((key) => {
      if (
        suggestedMoveCoords[
          `${elves[key].suggestedMoveCoords?.[0]},${elves[key].suggestedMoveCoords?.[1]}`
        ] > 1
      ) {
        elves[key].nextMove = null;
        elves[key].suggestedMove = null;
        elves[key].suggestedMoveCoords = null;
      } else {
        elves[key].nextMove = elves[key].suggestedMoveCoords;
      }
    });

    // Move elves
    Object.keys(elves).forEach((key) => {
      if (elves[key].nextMove) {
        elves[`${elves[key].nextMove[0]},${elves[key].nextMove[1]}`] = {
          suggestedMove: null,
          suggestedMoveCoords: null,
          nextMove: null,
        };

        delete elves[key];
        didMove = true;
      }
    });

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    didMove    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 214 \n",
      "color: white; background: black; font-weight: bold",
      "",
      didMove
    );
    if (!didMove && !theMove) theMove = currMove + 1;

    rotateDirectionArray();
  }

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      theMove    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 220 \n",
    "color: white; background: black; font-weight: bold",
    "",
    theMove
  );

  let offset = 10;
  let dataToRender = [];
  data.forEach((row, yIndex) => {
    let newRow = [];

    row.forEach((tile, xIndex) => {
      if (elves[`${yIndex - offset},${xIndex - offset}`]) {
        newRow.push("#");
      } else {
        newRow.push(".");
      }
    });

    dataToRender.push(newRow);
  });

  let xStart = 99999999999999;
  for (let i = 0; i < MAP_SIZE; i++) {
    for (let j = 0; j < MAP_SIZE; j++) {
      if (dataToRender[i][j] === "#" && j < xStart) xStart = j;
    }
  }
  let xEnd = 0;
  for (let i = 0; i < MAP_SIZE; i++) {
    for (let j = MAP_SIZE; j > 0; j--) {
      if (dataToRender[i][j] === "#" && j > xEnd) xEnd = j;
    }
  }
  let yStart = 99999999999999;
  for (let i = 0; i < MAP_SIZE; i++) {
    for (let j = 0; j < MAP_SIZE; j++) {
      if (dataToRender[i][j] === "#" && i < yStart) yStart = i;
    }
  }
  let yEnd = 0;
  for (let i = 0; i < MAP_SIZE; i++) {
    for (let j = MAP_SIZE; j > 0; j--) {
      if (dataToRender[i][j] === "#" && i > yEnd) yEnd = i;
    }
  }

  let counter = 0;
  // debugger;
  for (let i = yStart; i <= yEnd; i++) {
    for (let j = xStart; j <= xEnd; j++) {
      if (dataToRender[i][j] === ".") counter++;
    }
  }

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
