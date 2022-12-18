import React, { useState } from "react";
import rData from "./realData";

const data = rData
  .split(/\n/)
  .map((row) => row.split(",").map((nr) => parseInt(nr)));

const dataStrings = rData.split(/\n/);

let number = 0;

let sides = {};
data.forEach((cube, rowIndex) => {
  if (
    !dataStrings.includes([cube[0] + 1, cube[1], cube[2]].join(",")) &&
    !dataStrings.includes([cube[0] + 2, cube[1], cube[2]].join(",")) &&
    !dataStrings.includes([cube[0] + 3, cube[1], cube[2]].join(",")) &&
    !dataStrings.includes([cube[0] + 4, cube[1], cube[2]].join(",")) &&
    !dataStrings.includes([cube[0] + 5, cube[1], cube[2]].join(",")) &&
    dataStrings.includes([cube[0] + 6, cube[1], cube[2]].join(",")) //&&
    // dataStrings.includes([cube[0] + 1, cube[1] + 1, cube[2]].join(",")) &&
    // dataStrings.includes([cube[0] + 1, cube[1] - 1, cube[2]].join(",")) &&
    // dataStrings.includes([cube[0] + 1, cube[1], cube[2] + 1].join(",")) &&
    // dataStrings.includes([cube[0] + 1, cube[1], cube[2] - 1].join(","))
  ) {
    number++;
  }
});

let total = 4482;

// console.log(
//   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    total    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 547 \n",
//   "color: white; background: black; font-weight: bold",
//   "",
//   total - number * 6
// );

export default () => <div>{number}</div>;
