import React, { useState } from "react";
// import eData from "./exampleData";
import eData from "./exampleDataB";
import rData from "./realDataB";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

const data = rData
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

  // const [moveNr, setMoveNr] = useState(0);
  const [moveNr, setMoveNr] = useState(282030);
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
    // debugger;
    wall.forEach((coord, index) => {
      // if (coord[1] === 105) {
      //   debugger;
      // }
      if (wall[index + 1] && coord[0] === wall[index + 1][0]) {
        let length = wall[index + 1][1] - coord[1];
        if (length > 0) {
          for (let i = coord[1]; i < coord[1] + length; i++) {
            walls[coord[0] + "," + i] = true;
          }
        } else {
          // if (coord[1] === 105) {
          //   debugger;
          // }
          for (let i = coord[1] + length; i < coord[1]; i++) {
            walls[coord[0] + "," + i] = true;
          }
        }
      }
      if (wall[index + 1] && coord[1] === wall[index + 1][1]) {
        let length = wall[index + 1][0] - coord[0];
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

  // let startX = 493;
  // let endX = 503;
  // let endY = 14;
  let startX = 485;
  let endX = 570;
  let endY = 230;

  for (let i = 0; i < endY; i++) {
    let newRow = [];
    for (let j = startX; j <= endX; j++) {
      let coord = j.toString() + "," + i.toString();
      walls[coord] ? newRow.push("#") : newRow.push(".");
    }

    dataToRender.push(newRow);
  }

  let restingSandPositons = {};
  let orgSandPos = [500, -2];
  let sandPos = [...orgSandPos];

  let k = 0;

  const checkDown = (j, i) => {
    // if (k === moveNr - 1) {
    //   debugger;
    // }
    let downLeftCoord = j.toString() + "," + (i + 1).toString();
    if (!restingSandPositons[downLeftCoord] && !walls[downLeftCoord]) {
      if (checkDown(j, i + 1)) {
        return true;
      } else if (checkDownLeft(j, i + 1)) {
        return true;
      } else if (checkDownRight(j, i + 1)) {
        return true;
      } else {
        restingSandPositons[downLeftCoord] = true;
        return true;
      }
    }
  };

  const checkDownLeft = (j, i) => {
    // if (k === moveNr - 1) {
    //   debugger;
    // }

    // if (i > endY - 1) {
    //   console.log(
    //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      yoyoyoyo    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 145 \n",
    //     "color: white; background: black; font-weight: bold",
    //     ""
    //   );
    //   return true;
    // }

    let downLeftCoord = (j - 1).toString() + "," + (i + 1).toString();
    if (!restingSandPositons[downLeftCoord] && !walls[downLeftCoord]) {
      if (checkDown(j - 1, i + 1)) {
        return true;
      } else if (checkDownLeft(j - 1, i + 1)) {
        return true;
      } else if (checkDownRight(j - 1, i + 1)) {
        return true;
      } else {
        restingSandPositons[downLeftCoord] = true;
        return true;
      }
    }
  };

  const checkDownRight = (j, i) => {
    let downRightCoord = (j + 1).toString() + "," + (i + 1).toString();
    if (!restingSandPositons[downRightCoord] && !walls[downRightCoord]) {
      if (checkDown(j + 1, i + 1)) {
        return true;
      } else if (checkDownLeft(j + 1, i + 1)) {
        return true;
      } else if (checkDownRight(j + 1, i + 1)) {
        return true;
      } else {
        restingSandPositons[downRightCoord] = true;
        return true;
      }
    }
  };

  for (k = 0; k < moveNr; k++) {
    // console.log(
    //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        k    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 178 \n",
    //   "color: white; background: black; font-weight: bold",
    //   "",
    //   Object.keys(restingSandPositons).length
    // );
    sandPos[1]++;

    // if (restingSandPositons[(500, 0)]) {
    //   console.log(
    //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          yoyoyoyooyoyoyoyoy    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 205 \n",
    //     "color: white; background: black; font-weight: bold",
    //     ""
    //   );
    // }

    for (let i = 0; i < endY; i++) {
      for (let j = startX; j <= endX; j++) {
        if (sandPos[1] === i && sandPos[0] === j) {
          let coord = j.toString() + "," + (i + 1).toString();

          if (restingSandPositons[coord] || walls[coord]) {
            if (sandPos[0] === 500 && sandPos[1] === 0) {
              console.log(
                "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                yoyo    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 218 \n",
                "color: white; background: black; font-weight: bold",
                "",
                sandPos
              );

              console.log(
                "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      restingSandPositons    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 135 \n",
                "color: white; background: black; font-weight: bold",
                "",
                Object.keys(restingSandPositons).length
              );
            }
            if (!checkDownLeft(j, i) && !checkDownRight(j, i)) {
              restingSandPositons[j.toString() + "," + i.toString()] = true;
            }

            sandPos = [...orgSandPos];
          }
        }
      }
    }
  }

  // for (let i = 0; i < endY; i++) {
  //   for (let j = startX; j <= 503; j++) {
  //     if (sandPos[1] === i && sandPos[0] === j) {
  //       dataToRender[i][j - startX] = "+";
  //     }
  //     if (restingSandPositons[j.toString() + "," + i.toString()]) {
  //       dataToRender[i][j - startX] = "o";
  //     }
  //   }
  // }
  for (let i = 0; i < 170; i++) {
    for (let j = startX; j <= 570; j++) {
      if (sandPos[1] === i && sandPos[0] === j) {
        dataToRender[i][j - startX] = "+";
      }
      if (restingSandPositons[j.toString() + "," + i.toString()]) {
        dataToRender[i][j - startX] = "o";
      }
    }
  }

  // console.log(
  //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      restingSandPositons    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 128 \n",
  //   "color: white; background: black; font-weight: bold",
  //   "",
  //   restingSandPositons
  // );

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
          onClick={() => moveNr < totalNrOfMoves - 9 && setMoveNr(moveNr + 100)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves - 9 ? "black" : "lightGray",
          }}
        >
          Next 100
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
        shouldInvertY={false}
        sizeX={"30px"}
        sizeY={"15px"}
        isCenterOrigin={false}
      />
    </div>
  );
};
