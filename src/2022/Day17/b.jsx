import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";
import test2 from "./test2";

const MAP_HEIGHT = 120;
// const INITIAL_MOVE_NR = 11542;for example data 2022 settled
// const INITIAL_MOVE_NR = 11747; for real data 2022 settled
const INITIAL_MOVE_NR = 25;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const data = rData.split("").map((direction) => {
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

  let totalPileHeight = 0;
  let pileHeight = 0;
  let totalTruncatedHeight = 0;
  let currentShape = "horBar";
  let currentShapeYPos = 3;
  let currentShapeXPos = 2;
  let nrOfSettledShapes = 0;

  let filledTiles = [];
  for (let i = 0; i < MAP_HEIGHT; i++) {
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

  const checkIfCorrect = () => {
    if (nrOfSettledShapes === 2022) {
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          pileHeight    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 354 \n",
        "color: white; background: black; font-weight: bold",
        "",
        pileHeight + totalTruncatedHeight
      );
    }
  };

  let dataToRender = [];
  let moveCounter = 0;

  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  var startTime = performance.now();
  for (let m = 0; m <= moveNr; m++) {
    if (nrOfSettledShapes === 6825) {
      break;
    }

    if (moveCounter === data.length) {
      moveCounter = 0;
    }

    checkIfCorrect();

    if (data[moveCounter]) {
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
    for (let i = 0; i < filledTiles.length; i++) {
      let newRow = [];
      for (let j = 0; j < 7; j++) {
        // debugger;
        if (checkIsPartOfGround(j, i)) {
          newRow.push("@");
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
      currentShape = getNextShape(currentShape);
      if (currentShapeYPos + 1 > pileHeight) {
        pileHeight = currentShapeYPos + 1;
      }

      let truncateSize = 30;
      if (pileHeight > MAP_HEIGHT - 10) {
        currentShapeYPos =
          pileHeight + 2 + getShapeHeight(currentShape) - truncateSize;

        filledTiles = filledTiles.splice(truncateSize, filledTiles.length);
        for (let i = 0; i < truncateSize; i++) {
          filledTiles.push([false, false, false, false, false, false, false]);
        }

        pileHeight -= truncateSize;

        totalTruncatedHeight += truncateSize;
      } else {
        currentShapeYPos = pileHeight + 2 + getShapeHeight(currentShape);
      }

      currentShapeXPos = 2;
      nrOfSettledShapes++;
    }

    totalPileHeight = totalTruncatedHeight + pileHeight;

    currMove++;
  }
  var endTime = performance.now();

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      done:    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 437 \n",
    "color: white; background: black; font-weight: bold",
    "",
    endTime - startTime
  );

  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
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
      <div style={{ marginTop: "0px" }}>
        Move nr: {moveNr} totalP: {totalPileHeight} set: {nrOfSettledShapes}
      </div>
      {/* <div style={{ marginTop: "24px" }}>Result: {result}</div> */}
      <Render
        dataToRender={dataToRender}
        emptyTileIndicator={""}
        shouldRenderBinarily={false}
        shouldInvertX={false}
        shouldInvertY={false}
        sizeX={"6px"}
        sizeY={"4px"}
        isCenterOrigin={false}
      />
    </div>
  );
};
