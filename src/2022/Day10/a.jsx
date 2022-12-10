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

  data.forEach((line, index) => {
    if (line === "noop") {
      cycle++;

      if (
        cycle === 20 ||
        cycle === 60 ||
        cycle === 100 ||
        cycle === 140 ||
        cycle === 180 ||
        cycle === 220
      ) {
        console.log(
          "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              x    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 32 \n",
          "color: white; background: black; font-weight: bold",
          "",
          cycle,
          x,
          cycle * x
        );
        result += cycle * x;
      }
    } else {
      const nr = parseInt(line.split(" ")[1]);

      for (let i = 0; i < 2; i++) {
        cycle++;

        if (
          cycle === 20 ||
          cycle === 60 ||
          cycle === 100 ||
          cycle === 140 ||
          cycle === 180 ||
          cycle === 220
        ) {
          // console.log(
          //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              x    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 32 \n",
          //   "color: white; background: black; font-weight: bold",
          //   "",
          //   cycle,
          //   x,
          //   cycle * x
          // );
          result += cycle * x;
        }
      }

      x += nr;

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          x    \x1b[8m\x1b[40m\x1b[0m\n",
      //   "color: white; background: black; font-weight: bold",
      //   x
      // );
    }
  });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      x    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 43 \n",
    "color: white; background: black; font-weight: bold",
    "",
    x
  );

  return <div>{result}</div>;
};
