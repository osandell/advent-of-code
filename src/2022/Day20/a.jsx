import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let data = rData.split(/\n/).map((row) => parseInt(row));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const arrMove = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return [...arr];
};

const move = function (arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
};

export default () => {
  const totalNrOfMoves = 99999999999999999999999999;
  const [moveNr, setMoveNr] = useState(0);
  let result = 0;

  let newArray = [...data];
  // data.forEach((nr, index) => {

  // debugger;
  // for (let i = 0; i < newArray.length; i++) {
  for (let i = 0; i < 4; i++) {
    let currPos = newArray.indexOf(data[i]);
    let newPos = currPos + data[i];

    while (newPos > data.length - 1) {
      newPos = newPos - (data.length - 1);
    }

    while (newPos < 0) {
      newPos = newPos + (data.length - 1);
    }

    newArray = [...arrMove(newArray, currPos, newPos)];
  }
  // });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      newArray    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 46 \n",
    "color: white; background: black; font-weight: bold",
    "",
    newArray
  );

  let posOfZero = newArray.indexOf(0);

  let posOfNumber = posOfZero;
  for (let i = 0; i < 1000; i++) {
    posOfNumber = posOfNumber + 1;
    if (posOfNumber > newArray.length - 1) {
      posOfNumber = 0;
    }
  }
  let nr1 = newArray[posOfNumber];

  posOfNumber = posOfZero;
  for (let i = 0; i < 2000; i++) {
    posOfNumber = posOfNumber + 1;
    if (posOfNumber > newArray.length - 1) {
      posOfNumber = 0;
    }
  }
  let nr2 = newArray[posOfNumber];

  posOfNumber = posOfZero;
  for (let i = 0; i < 3000; i++) {
    posOfNumber = posOfNumber + 1;
    if (posOfNumber > newArray.length - 1) {
      posOfNumber = 0;
    }
  }
  let nr3 = newArray[posOfNumber];

  let dataToRender = [];
  newArray.forEach((row) => {
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
