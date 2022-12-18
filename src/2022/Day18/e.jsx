import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// const data = eData.split(/\n/).map((row) => row.split(""));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const data = rData
  .split(/\n/)
  .map((row) => row.split(",").map((nr) => parseInt(nr)));

let sides = {};
data.forEach((cube, rowIndex) => {
  let front =
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ];

  if (front !== undefined) {
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ] = { type: "front", amount: front + 1, cube: cube };
  } else {
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ] = { type: "front", amount: 0, cube: cube };
  }

  let left =
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ];

  if (left !== undefined) {
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ] = { type: "left", amount: left + 1, cube: cube };
  } else {
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ] = { type: "left", amount: 0, cube: cube };
  }

  let right =
    sides[
      cube[0] +
        1 +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ];

  if (right !== undefined) {
    sides[
      cube[0] +
        1 +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ] = { type: "right", amount: right + 1, cube: cube };
  } else {
    sides[
      cube[0] +
        1 +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2]
    ] = { type: "right", amount: 0, cube: cube };
  }

  let back =
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1)
    ];

  if (back !== undefined) {
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1)
    ] = { type: "back", amount: back + 1, cube: cube };
  } else {
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1)
    ] = { type: "back", amount: 0, cube: cube };
  }

  let top =
    sides[
      cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1)
    ];

  if (top !== undefined) {
    sides[
      cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1)
    ] = { type: "top", amount: top + 1, cube: cube };
  } else {
    sides[
      cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        (cube[1] + 1) +
        ":" +
        (cube[2] + 1)
    ] = { type: "top", amount: 0, cube: cube };
  }

  let bottom =
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1)
    ];

  if (bottom !== undefined) {
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1)
    ] = { type: "bottom", amount: bottom + 1, cube: cube };
  } else {
    sides[
      cube[0] +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        cube[2] +
        "," +
        (cube[0] + 1) +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1) +
        "," +
        cube[0] +
        ":" +
        cube[1] +
        ":" +
        (cube[2] + 1)
    ] = { type: "bottom", amount: 0, cube: cube };
  }
});

let validSides = {};
let total = 0;
Object.keys(sides).forEach((key, index) => {
  if (sides[key].amount === 0) {
    total++;
    validSides[key] = sides[key];
  }
});

const dataStrings = rData.split(/\n/);

let number = 0;

data.forEach((cube, rowIndex) => {
  if (
    !dataStrings.includes([cube[0] + 1, cube[1], cube[2]].join(",")) &&
    !dataStrings.includes([cube[0] + 2, cube[1], cube[2]].join(",")) &&
    !dataStrings.includes([cube[0] + 3, cube[1], cube[2]].join(",")) &&
    !dataStrings.includes([cube[0] + 4, cube[1], cube[2]].join(",")) &&
    !dataStrings.includes([cube[0] + 5, cube[1], cube[2]].join(",")) &&
    dataStrings.includes([cube[0] + 6, cube[1], cube[2]].join(",")) //&&
    // dataStrings.includes([cube[0] + 1, cube[1] + 1, cube[2]].join(",")) &&
    // dataStrings.includes([cube[0] + 1, cube[1] - 1, cube[2]].join(",")) &&
    // dataStrings.includes([cube[0] + 1, cube[1], cube[2] + 1].join(",")) &&
    // dataStrings.includes([cube[0] + 1, cube[1], cube[2] - 1].join(","))
  ) {
    number++;
  }
});

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
  // data.forEach((cube) => {
  //   let newRow = [];
  //   row.forEach((tile) => {
  //     newRow.push(tile);
  //   });

  //   dataToRender.push(newRow);
  // });

  let nrOfAirPockets = 0;
  let sidesConnecting = 0;

  let wholeDataToRender = [];
  for (let k = 0; k < 30; k++) {
    wholeDataToRender.push([]);
    // let k = moveNr;
    dataToRender = [];
    for (let i = 0; i < 30; i++) {
      let newRow = [];
      for (let j = 0; j < 30; j++) {
        let test = [i, j, 0].join(",");
        if (dataStrings.includes([i, j, k].join(","))) {
          newRow.push("#");
        } else {
          newRow.push(".");
        }
      }
      dataToRender.push(newRow);
    }
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        if (dataToRender[i][j] === "#") {
          break;
        } else {
          dataToRender[i][j] = "~";
        }
      }
    }
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        if (dataToRender[j][i] === "#") {
          break;
        } else {
          dataToRender[j][i] = "~";
        }
      }
    }
    for (let i = 0; i < 30; i++) {
      for (let j = 29; j >= 0; j--) {
        if (dataToRender[i][j] === "#") {
          break;
        } else {
          dataToRender[i][j] = "~";
        }
      }
    }
    for (let i = 0; i < 30; i++) {
      for (let j = 29; j >= 0; j--) {
        if (dataToRender[j][i] === "#") {
          break;
        } else {
          dataToRender[j][i] = "~";
        }
      }
    }
    for (let i = 0; i < 30; i++) {
      for (let j = 29; j >= 0; j--) {
        if (dataToRender[j][i] === ".") {
          if (
            dataToRender[j + 1][i] === "~" ||
            dataToRender[j - 1][i] === "~" ||
            dataToRender[j][i + 1] === "~" ||
            dataToRender[j][i - 1] === "~"
          )
            dataToRender[j][i] = "~";
        }
      }
    }
    for (let i = 0; i < 30; i++) {
      for (let j = 29; j >= 0; j--) {
        if (dataToRender[j][i] === ".") {
          if (
            dataToRender[j + 1][i] === "~" ||
            dataToRender[j - 1][i] === "~" ||
            dataToRender[j][i + 1] === "~" ||
            dataToRender[j][i - 1] === "~"
          )
            dataToRender[j][i] = "~";
        }
      }
    }
    for (let i = 0; i < 30; i++) {
      for (let j = 29; j >= 0; j--) {
        if (dataToRender[j][i] === ".") {
          if (
            dataToRender[j + 1][i] === "~" ||
            dataToRender[j - 1][i] === "~" ||
            dataToRender[j][i + 1] === "~" ||
            dataToRender[j][i - 1] === "~"
          )
            dataToRender[j][i] = "~";
        }
      }
    }

    if (
      moveNr !== 1 &&
      moveNr !== 2 &&
      moveNr !== 18 &&
      moveNr !== 19 &&
      moveNr !== 20
    ) {
      // for (let i = 0; i < 30; i++) {
      //   for (let j = 0; j < 30; j++) {
      //     if (dataToRender[j][i] === ".") {
      //       if (
      //         (moveNr === 4 && i === 17 && j === 11) ||
      //         (moveNr === 7 && i === 3 && j === 7) ||
      //         (moveNr === 8 && i === 3 && j === 7) ||
      //         (moveNr === 16 && i === 5 && j === 6) ||
      //         (moveNr === 16 && i === 17 && j === 14) ||
      //         (moveNr === 18 && i === 11 && j === 16) ||
      //         (moveNr === 18 && i === 5 && j === 8) ||
      //         (moveNr === 18 && i === 16 && j === 8) ||
      //         (moveNr === 11 && i === 13 && j === 1)
      //       ) {
      //       } else {
      //         dataToRender[j][i] = "O";
      //       }
      //     }
      //   }
      // }
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
          if (dataToRender[j][i] === ".") {
            if (
              (moveNr === 4 && i === 17 && j === 11) ||
              (moveNr === 7 && i === 3 && j === 7) ||
              (moveNr === 8 && i === 3 && j === 7) ||
              (moveNr === 16 && i === 5 && j === 6) ||
              (moveNr === 16 && i === 17 && j === 14) ||
              (moveNr === 18 && i === 11 && j === 16) ||
              (moveNr === 18 && i === 5 && j === 8) ||
              (moveNr === 18 && i === 16 && j === 8) ||
              (moveNr === 11 && i === 13 && j === 1)
            ) {
            } else {
              dataToRender[j][i] = "O";
            }
          }
        }
      }

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      sidesConnecting    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 175 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   4482 - sidesConnecting
      // );
    }

    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        if (dataToRender[j][i] === "O") {
          if (moveNr === 3) {
            // debugger;
          }

          if (dataStrings.includes(j + "," + i + "," + (k + 1)))
            sidesConnecting++;
          if (dataStrings.includes(j + "," + i + "," + (k - 1)))
            sidesConnecting++;
          if (dataStrings.includes((j + 1).toString() + "," + i + "," + k))
            sidesConnecting++;
          if (dataStrings.includes((j - 1).toString() + "," + i + "," + k))
            sidesConnecting++;
          if (dataStrings.includes(j + "," + (i + 1) + "," + k))
            sidesConnecting++;
          if (dataStrings.includes(j + "," + (i - 1) + "," + k))
            sidesConnecting++;

          nrOfAirPockets++;
        }
      }
    }
    wholeDataToRender[k] = dataToRender;
  }

  let nrOfSurfacesSides = 0;
  let nrForThisSide = 0;

  const increaseCounters = (key) => {
    // if (validSides[key].cube[2] === 0) {
    nrOfSurfacesSides++;
    nrForThisSide++;
    // }
  };

  for (let z = 0; z < 30; z++) {
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 30; x++) {
        if (wholeDataToRender[z][y][x] === "O") {
          if (wholeDataToRender[z - 1][y][x] === "~") {
            wholeDataToRender[z][y][x] = "~";
          }
          if (wholeDataToRender[z + 1][y][x] === "~") {
            wholeDataToRender[z][y][x] = "~";
          }
        }
        if (wholeDataToRender[z][y][x] === ".") {
          if (wholeDataToRender[z - 1][y][x] === "~") {
            wholeDataToRender[z][y][x] = "~";
          }
          if (wholeDataToRender[z + 1][y][x] === "~") {
            wholeDataToRender[z][y][x] = "~";
          }
        }
      }
    }
  }

  // console.log(
  //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      wholeDataToRender    \x1b[8m\x1b[40m\x1b[0m%c e.jsx 793 \n",
  //   "color: white; background: black; font-weight: bold",
  //   "",
  //   wholeDataToRender
  // );

  Object.keys(validSides).forEach((key) => {
    if (validSides[key].type === "front") {
      if (validSides[key].cube[2] - 1 < 0) {
        increaseCounters(key);
      } else if (
        wholeDataToRender[validSides[key].cube[2] - 1][validSides[key].cube[0]][
          validSides[key].cube[1]
        ] === "~"
      ) {
        increaseCounters(key);
      }
    }
    if (validSides[key].type === "back") {
      if (
        wholeDataToRender[validSides[key].cube[2] + 1][validSides[key].cube[0]][
          validSides[key].cube[1]
        ] === "~"
      ) {
        increaseCounters(key);
      }
    }
    if (validSides[key].type === "left") {
      if (validSides[key].cube[0] - 1 < 0) {
        increaseCounters(key);
      } else if (
        wholeDataToRender[validSides[key].cube[2]][validSides[key].cube[0] - 1][
          validSides[key].cube[1]
        ] === "~"
      ) {
        increaseCounters(key);
      }
    }
    if (validSides[key].type === "right") {
      if (
        wholeDataToRender[validSides[key].cube[2]][validSides[key].cube[0] + 1][
          validSides[key].cube[1]
        ] === "~"
      ) {
        increaseCounters(key);
      }
    }
    if (validSides[key].type === "bottom") {
      if (validSides[key].cube[1] - 1 < 0) {
        increaseCounters(key);
      } else if (
        wholeDataToRender[validSides[key].cube[2]][validSides[key].cube[0]][
          validSides[key].cube[1] - 1
        ] === "~"
      ) {
        increaseCounters(key);
      }
    }
    if (validSides[key].type === "top") {
      if (
        wholeDataToRender[validSides[key].cube[2]][validSides[key].cube[0]][
          validSides[key].cube[1] + 1
        ] === "~"
      ) {
        increaseCounters(key);
      }
    }
    // }
  });

  // *********************************************************************************

  return (
    <div>
      <Render
        dataToRender={wholeDataToRender[moveNr]}
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
      <div style={{ marginTop: "24px" }}>
        aripockest: {nrOfAirPockets} sides: {sidesConnecting} tot:
        {nrOfSurfacesSides}
      </div>
    </div>
  );
};
