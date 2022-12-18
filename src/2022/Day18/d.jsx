import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const data = rData
  .split(/\n/)
  .map((row) => row.split(",").map((nr) => parseInt(nr)));
const dataStrings = rData.split(/\n/);
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

let cubesWithSurface = [];

let checkAnyObstacleRight = (cube) => {
  for (let i = 1; i < 30; i++) {
    if (
      dataStrings.includes(
        (cube[0] + i).toString() + "," + cube[1] + "," + cube[2]
      )
    ) {
      return [cube[0] + i - 1, cube[1], cube[2]];
    }
  }
};
let checkAnyObstacleLeft = (cube) => {
  for (let i = 1; i < 30; i++) {
    if (
      dataStrings.includes(
        (cube[0] - i).toString() + "," + cube[1] + "," + cube[2]
      )
    ) {
      return [cube[0] - i + 1, cube[1], cube[2]];
    }
  }
};
let checkAnyObstacleTop = (cube) => {
  for (let i = 1; i < 30; i++) {
    if (
      dataStrings.includes(
        cube[0].toString() + "," + cube[1] + i + "," + cube[2]
      )
    ) {
      return [cube[0], cube[1] + i - 1, cube[2]];
    }
  }
};
let checkAnyObstacleBottom = (cube) => {
  for (let i = 1; i < 30; i++) {
    if (
      dataStrings.includes(
        cube[0].toString() + "," + cube[1] - i + "," + cube[2]
      )
    ) {
      return [cube[0], cube[1] - i + 1, cube[2]];
    }
  }
};
let checkAnyObstacleFront = (cube) => {
  for (let i = 1; i < 30; i++) {
    if (
      dataStrings.includes(
        cube[0].toString() + "," + cube[1] + "," + cube[2] - i
      )
    ) {
      return [cube[0], cube[1], cube[2] - i + 1];
    }
  }
};
let checkAnyObstacleBack = (cube) => {
  for (let i = 1; i < 30; i++) {
    if (
      dataStrings.includes(
        cube[0].toString() + "," + cube[1] + "," + cube[2] + i
      )
    ) {
      return [cube[0], cube[1], cube[2] + i - 1];
    }
  }
};

const checkIsSurficeSide = (type, value, cube) => {
  // debugger;
  switch (type) {
    case "right":
      if (!checkAnyObstacleRight(cube)) {
        if (!cubesWithSurface.includes(cube.join(","))) {
          cubesWithSurface.push(cube.join(","));
        }
      }
      return true;
    case "left":
      if (!checkAnyObstacleLeft(cube)) {
        if (!cubesWithSurface.includes(cube.join(","))) {
          cubesWithSurface.push(cube.join(","));
        }
      }
      return true;
    case "top":
      if (!checkAnyObstacleTop(cube)) {
        if (!cubesWithSurface.includes(cube.join(","))) {
          cubesWithSurface.push(cube.join(","));
        }
      }
      return true;
    case "bottom":
      if (!checkAnyObstacleBottom(cube)) {
        if (!cubesWithSurface.includes(cube.join(","))) {
          cubesWithSurface.push(cube.join(","));
        }
      }
      return true;
    case "front":
      if (!checkAnyObstacleFront(cube)) {
        if (!cubesWithSurface.includes(cube.join(","))) {
          cubesWithSurface.push(cube.join(","));
        }
      }
      return true;
    case "back":
      if (!checkAnyObstacleBack(cube)) {
        if (!cubesWithSurface.includes(cube.join(","))) {
          cubesWithSurface.push(cube.join(","));
        }
      }
      return true;
  }
};

export default () => {
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

  let total = 0;
  Object.keys(sides).forEach((value, index) => {
    if (sides[value].amount === 0) {
      total++;

      // if (parseInt(value.split(",")[0].split(":")[2]) === 0) {
      let type = sides[value].type;
      let cube = sides[value].cube;

      if (moveNr === 1 && cube[0] === 6 && cube[1] === 10 && cube[2] === 1) {
        let isSurficeSide = checkIsSurficeSide(type, value, cube);
        console.log(
          "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    isSurficeSide    \x1b[8m\x1b[40m\x1b[0m\n",
          "color: white; background: black; font-weight: bold",
          isSurficeSide
        );
      }
    }
  });

  // *********************************************************************************

  let result = 0;

  let k = moveNr;
  let dataToRender = [];
  for (let i = 0; i < 30; i++) {
    let newRow = [];
    for (let j = 0; j < 30; j++) {
      let test = [i, j, 0].join(",");
      if (cubesWithSurface.includes([i, j, k].join(","))) {
        newRow.push("#");
      } else {
        newRow.push(".");
      }
    }
    dataToRender.push(newRow);
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
