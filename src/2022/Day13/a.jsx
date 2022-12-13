import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

const extractArr = (row) => {
  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    row    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    row
  );
  if (!row.includes("[")) {
    return row.split(",").map((nr) => parseInt(nr));
  }

  let newArr = [];
  row.split("],").forEach((part) => {
    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    part    \x1b[8m\x1b[40m\x1b[0m\n",
      "color: white; background: black; font-weight: bold",
      part
    );
    if (part.includes("[")) {
      const digits = part.split("[")[0].split(",");
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    digits    \x1b[8m\x1b[40m\x1b[0m\n",
        "color: white; background: black; font-weight: bold",
        digits
      );

      digits.forEach((digit) => {
        if (parseInt(digit) >= 0) {
          newArr.push(parseInt(digit));
        }
      });
      let rightSideArray = part.split("[")[1];
      if (rightSideArray.includes("]")) {
        rightSideArray = rightSideArray.split("]")[0];
      }
      rightSideArray = "[" + rightSideArray + "]";
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    rightSideArray    \x1b[8m\x1b[40m\x1b[0m\n",
        "color: white; background: black; font-weight: bold",
        rightSideArray
      );
      // newArr.push(extractArr(rightSideArray));
    }

    //   if (part.length === 1) {
    //     return parseInt(part);
    //   }

    //   return part.split(",").map((part) => parseInt(part));
    // }
  });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      newArr    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 37 \n",
    "color: white; background: black; font-weight: bold",
    "",
    newArr
  );

  return newArr;
};

// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
const data = eData.split(/\n\n/).map((pair) =>
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  pair.split(/\n/).map((row) => {
    const arr = extractArr(row.substring(1, row.length - 1));
    return arr;
  })
);

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

  // *********************************************************************************

  let result = 0;

  for (let i = 0; i < moveNr; i++) {
    data.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {});
    });
  }

  const getIsOk = (arr1, arr2) => {
    let comparisonLength;
    if (arr1.length > arr2.length) {
      comparisonLength = arr1.length;
    } else {
      comparisonLength = arr2.length;
    }

    for (let i = 0; i < comparisonLength; i++) {
      const part1 = arr1[i];
      const part2 = arr2[i];

      if (typeof part1 === "object" && typeof part2 === "object") {
        return getIsOk(part1, part2);
      }
      if (typeof part1 === "number" && typeof part2 === "object") {
        if (part1 >= 0) {
          // not NaN
          return getIsOk([part1], part2);
        } else {
          return true;
        }
      }
      if (typeof part1 === "object" && typeof part2 === "number") {
        if (part2 >= 0) {
          // not NaN
          return getIsOk(part1, [part2]);
        } else {
          return false;
        }
      }

      if (part1 > part2) {
        return false;
      }
      if (part1 < part2) {
        return true;
      }
    }

    return true;
  };

  data.forEach((pair, index) => {
    // debugger;
    let isOk = getIsOk(pair[0], pair[1]);

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    isOk    \x1b[8m\x1b[40m\x1b[0m\n",
      "color: white; background: black; font-weight: bold",
      isOk
    );

    if (isOk) {
      result += index + 1;
    }
  });

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
