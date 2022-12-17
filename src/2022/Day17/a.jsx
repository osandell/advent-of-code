import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";
import test2 from "./test2";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;
const INITIAL_MOVE_NR = 0;
// const INITIAL_MOVE_NR = 0;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const data = eData.split("").map((direction) => {
  switch (direction) {
    case "<":
      return false;
    case ">":
      return true;
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

  // let totalNrOfMoves = 0;
  // for (let i = 0; i < data.length; i++) {
  //   const move = data[i];
  //   const nrOfMovesInCurrentDirection = move[1];
  //   for (let i = 0; i < nrOfMovesInCurrentDirection; i++) {
  //     totalNrOfMoves++;
  //   }
  // }
  const totalNrOfMoves = 99999999999999999999999999;

  const [moveNr, setMoveNr] = useState(INITIAL_MOVE_NR);
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

  // test2(data);

  let result = 0;
  let pileHeight = 0;
  let totalTruncatedHeight = 0;
  let currentShape = "horBar";
  let currentShapeYPos = 3;
  let currentShapeXPos = 2;
  let nrOfSettledShapes = 0;

  let filledTiles = [];
  for (let i = -12; i < 10; i++) {
    filledTiles.push([false, false, false, false, false, false, false]);
  }

  const checkIsPartOfGround = (x, y) => {
    if (filledTiles[y][x]) {
      return true;
    }
  };

  const checkCanMoveLeft = () => {
    if (currentShapeXPos === 0) {
      return false;
    }

    if (currMove === 163) {
      // debugger;
    }

    let xPos = currentShapeXPos - 1;
    let yPos = currentShapeYPos;

    switch (currentShape) {
      case "horBar":
        if (filledTiles[yPos][xPos]) {
          return false;
        } else {
          return true;
        }
      case "plus":
        if (
          filledTiles[yPos][xPos + 1] ||
          filledTiles[yPos - 1][xPos] ||
          filledTiles[yPos - 2][xPos + 1]
        ) {
          return false;
        } else {
          return true;
        }
      case "J":
        if (
          filledTiles[yPos][xPos + 2] ||
          filledTiles[yPos - 1][xPos + 2] ||
          filledTiles[yPos - 2][xPos]
        ) {
          return false;
        } else {
          return true;
        }
      case "vertBar":
        if (
          filledTiles[yPos][xPos] ||
          filledTiles[yPos - 1][xPos] ||
          filledTiles[yPos - 2][xPos] ||
          filledTiles[yPos - 3][xPos]
        ) {
          return false;
        } else {
          return true;
        }
      case "square":
        if (filledTiles[yPos][xPos] || filledTiles[yPos - 1][xPos]) {
          return false;
        } else {
          return true;
        }
    }

    return true;
  };

  const checkCanMoveRight = () => {
    if (currentShapeXPos + getShapeWidth(currentShape) >= 7) {
      return false;
    }

    // debugger;

    let xPos = currentShapeXPos + 1;
    let yPos = currentShapeYPos;

    switch (currentShape) {
      case "horBar":
        if (filledTiles[yPos][xPos + 3]) {
          return false;
        } else {
          return true;
        }
      case "plus":
        if (
          filledTiles[yPos][xPos + 1] ||
          filledTiles[yPos - 1][xPos + 2] ||
          filledTiles[yPos - 2][xPos + 1]
        ) {
          return false;
        } else {
          return true;
        }
      case "J":
        if (
          filledTiles[yPos][xPos + 2] ||
          filledTiles[yPos - 1][xPos + 2] ||
          filledTiles[yPos - 2][xPos + 2]
        ) {
          return false;
        } else {
          return true;
        }
      case "vertBar":
        if (
          filledTiles[yPos][xPos] ||
          filledTiles[yPos - 1][xPos] ||
          filledTiles[yPos - 2][xPos] ||
          filledTiles[yPos - 3][xPos]
        ) {
          return false;
        } else {
          return true;
        }
      case "square":
        if (filledTiles[yPos][xPos + 1] || filledTiles[yPos - 1][xPos + 1]) {
          return false;
        } else {
          return true;
        }
    }

    return true;
  };

  const checkIsPartOfShape = (x, y) => {
    switch (currentShape) {
      case "horBar":
        if (
          y === currentShapeYPos &&
          x >= currentShapeXPos &&
          x < currentShapeXPos + 4
        ) {
          return true;
        } else {
          return false;
        }
      case "plus":
        if (
          (y === currentShapeYPos && x === currentShapeXPos + 1) ||
          (y === currentShapeYPos - 1 && x === currentShapeXPos) ||
          (y === currentShapeYPos - 1 && x === currentShapeXPos + 1) ||
          (y === currentShapeYPos - 1 && x === currentShapeXPos + 2) ||
          (y === currentShapeYPos - 2 && x === currentShapeXPos + 1)
        ) {
          return true;
        } else {
          return false;
        }
      case "J":
        if (
          (y === currentShapeYPos && x === currentShapeXPos + 2) ||
          (y === currentShapeYPos - 1 && x === currentShapeXPos + 2) ||
          (y === currentShapeYPos - 2 && x === currentShapeXPos) ||
          (y === currentShapeYPos - 2 && x === currentShapeXPos + 1) ||
          (y === currentShapeYPos - 2 && x === currentShapeXPos + 2)
        ) {
          return true;
        } else {
          return false;
        }
      case "vertBar":
        if (
          y > currentShapeYPos - 4 &&
          y <= currentShapeYPos &&
          x === currentShapeXPos
        ) {
          return true;
        } else {
          return false;
        }
      case "square":
        if (
          (y === currentShapeYPos && x === currentShapeXPos) ||
          (y === currentShapeYPos && x === currentShapeXPos + 1) ||
          (y === currentShapeYPos - 1 && x === currentShapeXPos) ||
          (y === currentShapeYPos - 1 && x === currentShapeXPos + 1)
        ) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  };

  const checkWillCollide = () => {
    let willCollide = false;
    let height = getShapeHeight(currentShape);
    let width = getShapeWidth(currentShape);

    if (currentShapeYPos - height + 1 === 0) {
      return true;
    }

    if (currentShape === "plus") {
      if (
        checkIsPartOfGround(currentShapeXPos, currentShapeYPos - height + 1) ||
        checkIsPartOfGround(currentShapeXPos + 1, currentShapeYPos - height) ||
        checkIsPartOfGround(currentShapeXPos + 2, currentShapeYPos - height + 1)
      ) {
        willCollide = true;
      }
    } else {
      for (let i = currentShapeXPos; i < currentShapeXPos + width; i++) {
        if (checkIsPartOfGround(i, currentShapeYPos - height)) {
          willCollide = true;
        }
      }
    }

    return willCollide;
  };

  const getNextShape = (currentShape) => {
    switch (currentShape) {
      case "horBar":
        return "plus";
      case "plus":
        return "J";
      case "J":
        return "vertBar";
      case "vertBar":
        return "square";
      case "square":
        return "horBar";
    }
  };

  const getShapeWidth = (currentShape) => {
    switch (currentShape) {
      case "horBar":
        return 4;
      case "plus":
        return 3;
      case "J":
        return 3;
      case "vertBar":
        return 1;
      case "square":
        return 2;
    }
  };

  const getShapeHeight = (currentShape) => {
    switch (currentShape) {
      case "horBar":
        return 1;
      case "plus":
        return 3;
      case "J":
        return 3;
      case "vertBar":
        return 4;
      case "square":
        return 2;
    }
  };

  const fillTiles = () => {
    for (let i = 0; i <= currentShapeYPos; i++) {
      // debugger;
      for (let j = 0; j < 7; j++) {
        if (checkIsPartOfShape(j, i)) {
          filledTiles[i][j] = true;
        }
      }
    }
  };

  let dataToRender = [];
  let moveCounter = 0;
  for (let m = 0; m <= moveNr; m++) {
    if (moveCounter === data.length) {
      moveCounter = 0;
    }

    if (nrOfSettledShapes === 2022) {
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          pileHeight    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 354 \n",
        "color: white; background: black; font-weight: bold",
        "",
        pileHeight + totalTruncatedHeight
      );
    }

    // console.log(
    //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      nrOfSettledShapes    \x1b[8m\x1b[40m\x1b[0m%c test.js 316 \n",
    //   "color: white; background: black; font-weight: bold",
    //   "",
    //   currMove,
    //   currentShapeYPos,
    //   currentShapeXPos
    // );

    // console.log(
    //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        pileHeight    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 366 \n",
    //   "color: white; background: black; font-weight: bold",
    //   "",
    //   pileHeight + totalTruncatedHeight
    // );

    // console.log(
    //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    nrOfSettledShapes    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 366 \n",
    //   "color: white; background: black; font-weight: bold",
    //   "",
    //   nrOfSettledShapes
    // );

    if (currMove === 380) {
      // debugger;
    }

    if (data[moveCounter]) {
      if (currMove === 12) {
        // debugger;
      }
      if (checkCanMoveRight()) {
        currentShapeXPos++;
      }
    } else {
      if (checkCanMoveLeft()) {
        currentShapeXPos--;
      }
    }
    moveCounter++;

    dataToRender = [];
    for (let i = 0; i <= currentShapeYPos; i++) {
      let newRow = [];
      for (let j = 0; j < 7; j++) {
        if (checkIsPartOfGround(j, i)) {
          newRow.push("#");
        } else if (checkIsPartOfShape(j, i)) {
          newRow.push("@");
        } else {
          newRow.push(".");
        }
      }
      dataToRender.push(newRow);
    }

    if (!checkWillCollide()) {
      currentShapeYPos--;
    } else {
      fillTiles();

      let yPositions = {};
      let shapeHeight = getShapeHeight(currentShape);
      if (currMove === moveNr) {
        // debugger;
      }
      for (
        let i = currentShapeYPos - shapeHeight - 6;
        i <= currentShapeYPos - shapeHeight + 6;
        i++
      ) {
        for (let j = 0; j < 7; j++) {
          if (i > 10 && filledTiles[i][j]) {
            yPositions[j.toString()] = true;
          }
        }
      }

      let hasTruncated = false;
      let truncatedHeight = 0;
      if (Object.keys(yPositions).length === 7) {
        let oldHeight = filledTiles.length;
        filledTiles = filledTiles.filter((row, index) => {
          return index > currentShapeYPos - shapeHeight - 10;
        });
        truncatedHeight = oldHeight - filledTiles.length;

        hasTruncated = true;
        totalTruncatedHeight += currentShapeYPos - shapeHeight - 10 + 1;
      }

      currentShape = getNextShape(currentShape);
      if (currentShapeYPos + 1 > pileHeight) {
        pileHeight = currentShapeYPos + 1;
      }
      if (hasTruncated) {
        currentShapeYPos =
          pileHeight +
          2 +
          getShapeHeight(currentShape) -
          (currentShapeYPos - shapeHeight - 10 + 1);

        // pileHeight = pileHeight - (currentShapeYPos - shapeHeight - 10 + 2);
        pileHeight = pileHeight - truncatedHeight;

        for (let i = -12; i < 10; i++) {
          filledTiles.push([false, false, false, false, false, false, false]);
        }
      } else {
        currentShapeYPos = pileHeight + 2 + getShapeHeight(currentShape);
        for (let i = -12; i < 10; i++) {
          filledTiles.push([false, false, false, false, false, false, false]);
        }
      }
      currentShapeXPos = 2;
      nrOfSettledShapes++;
    }

    currMove++;
  }

  // *********************************************************************************

  return (
    <div style={{ height: "100vh" }}>
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
      <Render
        dataToRender={dataToRender}
        emptyTileIndicator={""}
        shouldRenderBinarily={false}
        shouldInvertX={false}
        shouldInvertY={true}
        sizeX={"20px"}
        sizeY={"15px"}
        isCenterOrigin={false}
      />
    </div>
  );
};
