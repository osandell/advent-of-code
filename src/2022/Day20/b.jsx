import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let data = rData.split(/\n/).map((row) => BigInt(parseInt(row)));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const arrMove = (arr, old_index, new_index) => {
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return [...arr];
};

export default () => {
  var startTime = performance.now();
  const totalNrOfMoves = 99999999999999999999999999;
  const [moveNr, setMoveNr] = useState(0);
  let result = 0;

  let newArray = [];
  let test = {};

  data.forEach((nr, index) => {
    nr = nr * 811589153n;

    if (nr !== 0n) {
      newArray.push(nr.toString() + ":" + index.toString());
    } else {
      newArray.push("nr" + nr.toString() + ":" + index.toString());
    }
  });

  newArray.forEach((nr, index) => {
    if (!test[nr]) test[nr] = 0;
    else test[nr] = test[nr] + 1;
  });

  let newArray2 = [...newArray];

  // debugger;
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < newArray.length; i++) {
      let currPos = newArray2.indexOf(newArray[i]);
      let newPos = currPos + parseInt(newArray[i].split(":")[0]);
      if (newArray[i].split(":")[0] === "nr0") {
        newPos = currPos;
      }
      newPos = newPos % (newArray.length - 1);
      newArray2 = [...arrMove(newArray2, currPos, newPos)];
    }
  }

  let posOfZero;

  newArray2.forEach((nr, index) => {
    if (nr.includes("nr0:")) {
      posOfZero = index;
    }
  });

  let posOfNumber = posOfZero;
  for (let i = 0; i < 1000; i++) {
    posOfNumber = posOfNumber + 1;
    if (posOfNumber > newArray2.length - 1) {
      posOfNumber = 0;
    }
  }
  let nr1 = parseInt(newArray2[posOfNumber].split(":")[0]);
  let nr1index = parseInt(newArray2[posOfNumber].split(":")[1]);
  let nr1org = data[nr1index];
  // nr1 = nr1org;

  posOfNumber = posOfZero;
  for (let i = 0; i < 2000; i++) {
    posOfNumber = posOfNumber + 1;
    if (posOfNumber > newArray2.length - 1) {
      posOfNumber = 0;
    }
  }
  // let nr2 = data[parseInt(newArray2[posOfNumber].split(":")[1])];
  let nr2 = parseInt(newArray2[posOfNumber].split(":")[0]);

  posOfNumber = posOfZero;
  for (let i = 0; i < 3000; i++) {
    posOfNumber = posOfNumber + 1;
    if (posOfNumber > newArray2.length - 1) {
      posOfNumber = 0;
    }
  }
  // let nr3 = data[parseInt(newArray2[posOfNumber].split(":")[1])];
  let nr3 = parseInt(newArray2[posOfNumber].split(":")[0]);

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      nr1, nr2, nr3    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 85 \n",
    "color: white; background: black; font-weight: bold",
    "",
    nr1,
    nr2,
    nr3
  );

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      nr1+nr2+nr3    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 94 \n",
    "color: white; background: black; font-weight: bold",
    "",
    nr1 + nr2 + nr3
  );

  let dataToRender = [];
  newArray2.forEach((row) => {
    dataToRender.push([row]);
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
