import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

const data = eData.split(/\n/).map((row) => row.split(""));

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

  const checkOneUp = (curLetter, checkLetter) => {
    if (curLetter === "S") {
      if (checkLetter === "b") {
        return true;
      } else {
        return false;
      }
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    return alphabet.indexOf(checkLetter) === alphabet.indexOf(curLetter) + 1;
  };

  const checkSame = (curLetter, checkLetter) => {
    if (curLetter === "S") {
      if (checkLetter === "a") {
        return true;
      } else {
        return false;
      }
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    return alphabet.indexOf(checkLetter) === alphabet.indexOf(curLetter);
  };

  // *********************************************************************************

  let position;
  let startPos;
  data.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile === "S") {
        position = [rowIndex, tileIndex];
        startPos = [rowIndex, tileIndex];
      }
    });
  });

  let endPos;
  data.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile === "E") {
        endPos = [rowIndex, tileIndex];
      }
    });
  });

  let dataToRender = [];
  data.forEach((row, rowIndex) => {
    let newRow = [];
    row.forEach((tile, tileIndex) => {
      if (tile === "E") {
        // endPos = [rowIndex, tileIndex];
      }

      newRow.push(tile);
    });

    dataToRender.push(newRow);
  });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        data[rowIndex][tileIndex]    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 62 \n",
    "color: white; background: black; font-weight: bold",
    "",
    data[position[0]][position[1] + 1]
  );

  let wayIsLegit = false;
  let triedPaths = [];
  let path = [];
  // while (!wayIsLegit) {
  for (let i = 0; i < moveNr; i++) {
    // debugger;
    const move = data[i];

    let nextPos;

    let distance = 0;
    let foundOneUp = false;

    if (position[0] < endPos[0]) {
      if (
        checkOneUp(
          data[position[0]][position[1]],
          data[position[0] + 1][position[1]]
        )
      ) {
        foundOneUp = true;
        nextPos = [position[0] + 1, position[1]];
        distance = (endPos[0] - position[0]) * (endPos[0] - position[0]);
      }
    } else if (position[0] > endPos[0]) {
      if (
        checkOneUp(
          data[position[0]][position[1]],
          data[position[0] - 1][position[1]]
        )
      ) {
        foundOneUp = true;
        let thisDist = endPos[0] - position[0];
        if (thisDist > distance) {
          nextPos = [position[0] - 1, position[1]];
          distance = (endPos[0] - position[0]) * (endPos[0] - position[0]);
        }
      }
    }

    if (position[1] < endPos[1]) {
      if (
        checkOneUp(
          data[position[0]][position[1]],
          data[position[0]][position[1] + 1]
        )
      ) {
        foundOneUp = true;
        let thisDist = endPos[1] - position[1];
        if (thisDist > distance) {
          nextPos = [position[0], position[1] + 1];
          distance = (endPos[1] - position[1]) * (endPos[1] - position[1]);
        }
      }
    } else if (position[1] > endPos[1]) {
      if (
        checkOneUp(
          data[position[0]][position[1]],
          data[position[0]][position[1] - 1]
        )
      ) {
        foundOneUp = true;
        let thisDist = endPos[1] - position[1];
        if (thisDist > distance) {
          nextPos = [position[0], position[1] - 1];
          distance = (endPos[1] - position[1]) * (endPos[1] - position[1]);
        }
      }
    }

    if (!foundOneUp) {
      if (position[0] < endPos[0]) {
        if (
          checkSame(
            data[position[0]][position[1]],
            data[position[0] + 1][position[1]]
          )
        ) {
          nextPos = [position[0] + 1, position[1]];
          distance = (endPos[0] - position[0]) * (endPos[0] - position[0]);
        }

        if (position[0] > endPos[0]) {
          if (
            checkSame(
              data[position[0]][position[1]],
              data[position[0] - 1][position[1]]
            )
          ) {
            let thisDist = endPos[0] - position[0];
            if (thisDist > distance) {
              nextPos = [position[0] - 1, position[1]];
              distance = (endPos[0] - position[0]) * (endPos[0] - position[0]);
            }
          }
        }
      }

      if (position[1] < endPos[1]) {
        if (
          checkSame(
            data[position[0]][position[1]],
            data[position[0]][position[1] + 1]
          )
        ) {
          let thisDist = endPos[1] - position[1];
          if (thisDist > distance) {
            nextPos = [position[0], position[1] + 1];
            distance = (endPos[1] - position[1]) * (endPos[1] - position[1]);
          }
        }
        if (position[0] > endPos[0]) {
          if (
            checkSame(
              data[position[0]][position[1]],
              data[position[0]][position[1] - 1]
            )
          ) {
            let thisDist = endPos[1] - position[1];
            if (thisDist > distance) {
              nextPos = [position[0], position[1] - 1];
              distance = (endPos[1] - position[1]) * (endPos[1] - position[1]);
            }
          }
        }
      }
    }
    if (nextPos) {
      debugger;

      wayIsLegit = true;
      position = nextPos;
      path.push([...nextPos]);
    } else {
      // debugger;
      path.push(nextPos);
      let pathCopy = [...path];
      triedPaths.push(pathCopy);
      position = startPos;
    }

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        triedPaths    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 251 \n",
      "color: white; background: black; font-weight: bold",
      "",
      triedPaths
    );

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        position    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 194 \n",
      "color: white; background: black; font-weight: bold",
      "",
      position
    );

    dataToRender = [];
    data.forEach((row, rowIndex) => {
      let newRow = [];
      row.forEach((tile, tileIndex) => {
        if (rowIndex === position[0] && tileIndex === position[1]) {
          newRow.push("*");
        } else {
          newRow.push(tile);
        }
      });

      dataToRender.push(newRow);
    });
  }

  let result = 0;

  // *********************************************************************************

  return (
    <div>
      <Render
        dataToRender={dataToRender}
        emptyTileIndicator={""}
        shouldRenderBinarily={false}
        shouldInvertX={false}
        shouldInvertY={false}
        sizeX={"11px"}
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
