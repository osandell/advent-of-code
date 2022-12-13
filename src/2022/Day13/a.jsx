import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const data = eData.split(/\n\n/).map((pair) =>
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  pair.split(/\n/).map((row) => {
    // const arr = extractArr(row.substring(1, row.length - 1));
    const arr = JSON.parse(row.replace(/\'/g, '"'));

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

  const compare = (arr1, arr2) => {
    let comparisonLength;
    if (arr1.length > arr2.length) {
      comparisonLength = arr1.length;
    } else {
      comparisonLength = arr2.length;
    }

    for (let i = 0; i < comparisonLength; i++) {
      const part1 = arr1[i];
      const part2 = arr2[i];

      if (part2 === undefined) {
        return "wrongOrder";
      }
      if (part1 === undefined) {
        return "rightOrder";
      }

      if (typeof part1 === "object" && typeof part2 === "object") {
        const res = compare(part1, part2);
        if (res === "wrongOrder") {
          return "wrongOrder";
        } else if (res === "rightOrder") {
          return "rightOrder";
        }
      }
      if (typeof part1 === "number" && typeof part2 === "object") {
        const res = compare([part1], part2);
        if (res === "wrongOrder") {
          return "wrongOrder";
        } else if (res === "rightOrder") {
          return "rightOrder";
        }
      }
      if (typeof part1 === "object" && typeof part2 === "number") {
        const res = compare(part1, [part2]);
        if (res === "wrongOrder") {
          return "wrongOrder";
        } else if (res === "rightOrder") {
          return "rightOrder";
        }
      }

      if (part1 > part2) {
        return "wrongOrder";
      }
      if (part1 < part2) {
        return "rightOrder";
      }
    }

    return "equal";
  };

  data.forEach((pair, index) => {
    // debugger;

    const res = compare(pair[0], pair[1]);
    if (res === "rightOrder") {
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
