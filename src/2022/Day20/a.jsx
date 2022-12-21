import React, { useState } from "react";
import eData from "./exampleDataB";
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

const move = function (arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
};

export default () => {
  let newArray = [...data];
  data.forEach((nr, index) => {
    // console.log(
    //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    index    \x1b[8m\x1b[40m\x1b[0m\n",
    //   "color: white; background: black; font-weight: bold",
    //   index
    // );
    if (index === 4) {
      // debugger;
    }

    // debugger;

    let currPos = newArray.indexOf(nr);
    let newPos = currPos + nr;
    let movingForward = nr > 0;
    let movingBackward = nr < 0;

    debugger;

    while (newPos > data.length - 1) {
      newPos = newPos - (data.length - 1);
    }

    while (newPos < 0) {
      newPos = newPos + (data.length - 1);
    }

    // if (newPos === 0 && movingBackward) {
    //   newPos = data.length - 1;
    // }

    // if (newPos === data.length - 1 && movingForward) {
    //   newPos = 0;
    // }

    newArray = [...arrMove(newArray, currPos, newPos)];

    // debugger;
    // let currPos = newArray.indexOf(nr);
    // if (nr < 0) {
    //   for (let i = nr; i < 0; i++) {
    //     if (currPos - 1 === 0) {
    //       newArray = [...move(newArray, currPos, newArray.length - 1)];
    //       currPos = newArray.length - 1;
    //     } else {
    //       newArray = [...move(newArray, currPos, currPos - 1)];
    //       currPos = currPos - 1;
    //     }
    //   }
    // } else if (nr > 0) {
    //   for (let i = nr; i > 0; i--) {
    //     if (currPos + 1 === newArray.length - 1) {
    //       newArray = [...move(newArray, currPos, 0)];
    //       currPos = 0;
    //     } else {
    //       newArray = [...move(newArray, currPos, currPos + 1)];
    //       currPos = currPos + 1;
    //     }
    //   }
    // }
  });
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
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          yo3    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 130 \n",
        "color: white; background: black; font-weight: bold",
        ""
      );
      posOfNumber = 0;
    }
  }
  let nr3 = newArray[posOfNumber];

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    nr1, nr2, nr3    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 67 \n",
    "color: white; background: black; font-weight: bold",
    "",
    nr1,
    nr2,
    nr3
  );

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    nr1 + nr2 + nr3    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 77 \n",
    "color: white; background: black; font-weight: bold",
    "",
    nr1 + nr2 + nr3
  );

  return <div></div>;
};
