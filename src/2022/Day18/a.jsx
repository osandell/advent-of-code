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
    ] = front + 1;
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
    ] = 0;
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
    ] = left + 1;
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
    ] = 0;
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
    ] = right + 1;
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
    ] = 0;
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
    ] = back + 1;
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
    ] = 0;
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
    ] = top + 1;
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
    ] = 0;
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
    ] = bottom + 1;
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
    ] = 0;
  }
});

const checkIsFrontOrBack = (coords) => {
  let lastZ;
  coords.forEach((coord) => {
    let z = coord.split(":")[2];

    if (lastZ && lastZ !== z) {
      return false;
    }

    lastZ = z;
  });
  return true;
};
const checkIsLeftOrRight = (coords) => {
  let lastX;
  let isLorR = true;
  coords.forEach((coord) => {
    let x = coord.split(":")[0];

    if (lastX && lastX !== x) {
      isLorR = false;
    }

    lastX = x;
  });
  return isLorR;
};
const checkIsTopOrBottom = (coords) => {
  let lastY;
  coords.forEach((coord) => {
    let y = coord.split(":")[0];

    if (lastY && lastY !== y) {
      return false;
    }

    lastY = y;
  });
  return true;
};

let total = 0;
Object.keys(sides).forEach((value, index) => {
  if (sides[value] === 0) {
    total++;
  }

  let coords = value.split(",");
  let isFrontOrBack = checkIsFrontOrBack(coords);

  if (isFrontOrBack && index === 0) {
    let coords = value
      .split(",")
      .map((nr) => nr.split(":").map((nr) => parseInt(nr)));

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        coords    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 566 \n",
      "color: white; background: black; font-weight: bold",
      "",
      coords
    );

    let opposite1 =
      coords[0][0] +
      ":" +
      coords[0][1] +
      ":" +
      (coords[0][2] + 1) +
      "," +
      coords[1][0] +
      ":" +
      coords[1][1] +
      ":" +
      (coords[1][2] + 1) +
      "," +
      coords[2][0] +
      ":" +
      coords[2][1] +
      ":" +
      (coords[2][2] + 1) +
      "," +
      coords[3][0] +
      ":" +
      coords[3][1] +
      ":" +
      (coords[3][2] + 1);

    let opposite2 =
      coords[0][0] +
      ":" +
      coords[0][1] +
      ":" +
      (coords[0][2] - 1) +
      "," +
      coords[1][0] +
      ":" +
      coords[1][1] +
      ":" +
      (coords[1][2] - 1) +
      "," +
      coords[2][0] +
      ":" +
      coords[2][1] +
      ":" +
      (coords[2][2] - 1) +
      "," +
      coords[3][0] +
      ":" +
      coords[3][1] +
      ":" +
      (coords[3][2] - 1);

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          opposite1    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 617 \n",
      "color: white; background: black; font-weight: bold",
      "",
      opposite1
    );

    //opposite
    if (sides[opposite1] || sides[opposite2]) {
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    hasopp    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 625 \n",
        "color: white; background: black; font-weight: bold",
        ""
      );
    }
  }
});

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
