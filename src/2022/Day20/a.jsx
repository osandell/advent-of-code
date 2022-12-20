import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let data = eData.split(/\n/).map((row) => parseInt(row));
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

export default () => {
  let newArray = [...data];
  data.forEach((nr) => {
    let currPos = newArray.indexOf(nr);
    let newPos = currPos + nr;

    let hasMoved = false;
    while (newPos > data.length - 1) {
      // debugger;
      hasMoved = true;
      if (newPos === data.length) {
        newPos = 0;
      } else {
        newPos = newPos - data.length + 1;
      }
    }

    if (!hasMoved) {
      while (newPos <= 0) {
        newPos = data.length + newPos - 1;
      }
    }

    newArray = [...arrMove(newArray, currPos, newPos)];
    // console.log(
    //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      newArray    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 40 \n",
    //   "color: white; background: black; font-weight: bold",
    //   "",
    //   newArray
    // );
  });

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

  // console.log(
  //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    nr1, nr2, nr3    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 67 \n",
  //   "color: white; background: black; font-weight: bold",
  //   "",
  //   nr1,
  //   nr2,
  //   nr3
  // );

  // console.log(
  //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    nr1 + nr2 + nr3    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 77 \n",
  //   "color: white; background: black; font-weight: bold",
  //   "",
  //   nr1 + nr2 + nr3
  // );

  return <div></div>;
};
