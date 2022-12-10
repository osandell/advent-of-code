import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

export default () => {
  const data2 = `noop
  addx 3
  addx -5`;
  const data = realData.split("\n");

  let cycle = 0;
  let x = 1;
  let result = 0;
  const lines = ["", "", "", "", "", ""];

  const draw = (cycle, x) => {
    let pos1 = x - 1;
    let pos2 = x;
    let pos3 = x + 1;

    if (cycle < 40) {
      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          x    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 30 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   cycle,
      //   pos1,
      //   pos2,
      //   pos3,
      //   lines[0]
      // );

      if (pos1 === cycle || pos2 === cycle || pos3 === cycle) {
        lines[0] += "x";
      } else {
        lines[0] += "_";
      }
    } else if (cycle < 80) {
      pos1 += 40;
      pos2 += 40;
      pos3 += 40;

      if (pos1 === cycle || pos2 === cycle || pos3 === cycle) {
        lines[1] += "x";
      } else {
        lines[1] += "_";
      }
    } else if (cycle < 120) {
      pos1 += 80;
      pos2 += 80;
      pos3 += 80;

      if (pos1 === cycle || pos2 === cycle || pos3 === cycle) {
        lines[2] += "x";
      } else {
        lines[2] += "_";
      }
    } else if (cycle < 160) {
      pos1 += 120;
      pos2 += 120;
      pos3 += 120;

      if (pos1 === cycle || pos2 === cycle || pos3 === cycle) {
        lines[3] += "x";
      } else {
        lines[3] += "_";
      }
    } else if (cycle < 200) {
      pos1 += 160;
      pos2 += 160;
      pos3 += 160;
      if (pos1 === cycle || pos2 === cycle || pos3 === cycle) {
        lines[4] += "x";
      } else {
        lines[4] += "_";
      }
    } else if (cycle < 240) {
      pos1 += 200;
      pos2 += 200;
      pos3 += 200;

      if (pos1 === cycle || pos2 === cycle || pos3 === cycle) {
        lines[5] += "x";
      } else {
        lines[5] += "_";
      }
    }
  };

  data.forEach((line, index) => {
    if (line === "noop") {
      draw(cycle, x);
      cycle++;

      if (
        cycle === 20 ||
        cycle === 60 ||
        cycle === 100 ||
        cycle === 140 ||
        cycle === 180 ||
        cycle === 220
      ) {
        result += cycle * x;
      }
    } else {
      const nr = parseInt(line.split(" ")[1]);

      for (let i = 0; i < 2; i++) {
        draw(cycle, x);
        cycle++;

        if (
          cycle === 20 ||
          cycle === 60 ||
          cycle === 100 ||
          cycle === 140 ||
          cycle === 180 ||
          cycle === 220
        ) {
          result += cycle * x;
        }

        if (i === 1) {
          x += nr;
        }
      }
    }
  });

  lines.forEach((line, index) => {
    // for (var i = 0; i < 40; i++) {
    //   lines[index] += ".";
    // }
    console.log(index.toString() + lines[index]);
  });

  // PZGPKPEB
  return <div>{result}</div>;
};
