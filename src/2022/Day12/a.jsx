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

  const checkOneUpOrSame = (curLetter, checkLetter) => {
    if (curLetter === "S") {
      if (checkLetter === "a") {
        return true;
      } else {
        return false;
      }
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    return (
      alphabet.indexOf(checkLetter) === alphabet.indexOf(curLetter) ||
      alphabet.indexOf(checkLetter) === alphabet.indexOf(curLetter) + 1
    );
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

  let triedPaths = [];
  let successfulPaths = [];
  let path = "0:0=>";
  let noGoSquares = {};
  for (let i = 0; i < moveNr; i++) {
    // debugger;
    const move = data[i];

    let nextPos;

    let distance = 0;
    let foundOneUp = false;
    let foundEnd = false;

    const calculateNextPos = (y, x) => {
      if (y < 0 || x < 0 || y >= data.length || x >= data[0].length) {
        return;
      }
      let prevPos;
      if (path.length > 5) {
        // debugger;
        prevPos = path.split("=>");
        prevPos = prevPos[prevPos.length - 3];
        prevPos = prevPos.split(":").map((str) => parseInt(str));
      }

      if (prevPos && prevPos[0] === y && prevPos[1] === x) {
        return;
      }

      if (data[y][x] === "E") {
        foundEnd = true;
      }

      if (checkOneUpOrSame(data[position[0]][position[1]], data[y][x])) {
        foundOneUp = true;
        let alreadyTried = false;
        triedPaths.forEach((triedPath) => {
          if (triedPath.includes(path + y.toString() + ":" + x.toString())) {
            alreadyTried = true;
          }
        });

        if (!alreadyTried) {
          nextPos = [y, x];
        }
      }
    };

    if (!nextPos) {
      calculateNextPos(position[0] + 1, position[1]);
    }
    if (!nextPos) {
      calculateNextPos(position[0] - 1, position[1]);
    }
    if (!nextPos) {
      calculateNextPos(position[0], position[1] + 1);
    }
    if (!nextPos) {
      calculateNextPos(position[0], position[1] - 1);
    }

    if (nextPos) {
      // debugger;

      position = nextPos;
      path += position[0].toString() + ":" + position[1].toString() + "=>";
    } else {
      if (position[0] === 0 && position[1] === 0) {
        alert("yo");
      }

      // debugger;
      triedPaths.push(path);

      if (foundEnd) {
        successfulPaths.push(path);
        foundEnd = false;
      } else {
        noGoSquares[position[0] + ":" + position[1]] = true;
      }

      let prevPos = path.split("=>");
      prevPos = prevPos[prevPos.length - 3];
      prevPos = prevPos.split(":").map((str) => parseInt(str));

      position = [...prevPos];
      path = path.substring(0, path.length - 5);
      let i = 8;
    }
    i === moveNr - 1 &&
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        noGoSquares    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 227 \n",
        "color: white; background: black; font-weight: bold",
        "",
        noGoSquares
      );

    // i === moveNr - 1 &&
    //   console.log(
    //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        path    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 387 \n",
    //     "color: white; background: black; font-weight: bold",
    //     "",
    //     path
    //   );

    // i === moveNr - 1 &&
    //   console.log(
    //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        position    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 393 \n",
    //     "color: white; background: black; font-weight: bold",
    //     "",
    //     position
    //   );

    // i === moveNr - 1 &&
    //   console.log(
    //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        triedPaths    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 395 \n",
    //     "color: white; background: black; font-weight: bold",
    //     "",
    //     triedPaths
    //   );

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
