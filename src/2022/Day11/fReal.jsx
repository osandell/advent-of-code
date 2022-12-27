import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  const data = eData
    .split("\n\n")
    .map((monkeyChunk) => monkeyChunk.split("\n"))
    .map((line, index) => {
      const funcsExample = [
        (old) => old * 19,
        (old) => old + 6,
        (old) => old * old,
        (old) => old + 3,
      ];

      const funcsReal = [
        (old) => old * 13,
        (old) => old + 4,
        (old) => old * 11,
        (old) => old + 8,
        (old) => old * old,
        (old) => old + 5,
        (old) => old + 1,
        (old) => old + 3,
      ];

      return {
        items: line[1]
          .split(": ")[1]
          .split(", ")
          .map((nr) => parseInt(nr)),
        // operation: funcsReal[index],
        operation: funcsExample[index],
        test: parseInt(line[3].split("by ")[1]),
        true: parseInt(line[4].split("monkey ")[1]),
        false: parseInt(line[5].split("monkey ")[1]),
        inspectedTimes: 0,
      };
    });

  for (let j = 0; j < 20; j++) {
    for (let i = 0; i < data.length; i++) {
      data[i].items.forEach((item) => {
        let worryLevel = item;

        // if (j % 1000 === 0) console.log(j, worryLevel);

        worryLevel = data[i].operation(worryLevel);

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        if (worryLevel % data[i].test === 0) {
          data[data[i].true].items.push(worryLevel);
        } else {
          let twoRest = worryLevel % 2;
          let threeRest = worryLevel % 3;
          let fiveRest = worryLevel % 5;
          let sevenRest = worryLevel % 7;
          let elevenRest = worryLevel % 11;
          let thirteenRest = worryLevel % 13;
          let seventeenRest = worryLevel % 17;
          let nineteenRest = worryLevel % 19;
          let twentyThreeRest = worryLevel % 23;
          let theNumber = 0;

          for (let k = 0; k < 1000000; k++) {
            // if (k % 1000 === 0) console.log(k);
            if (
              k % 23 === twentyThreeRest &&
              k % 13 === thirteenRest &&
              k % 19 === nineteenRest &&
              k % 17 === seventeenRest
            ) {
              // if (
              //   k % 2 === twoRest &&
              //   k % 3 === threeRest &&
              //   k % 5 === fiveRest &&
              //   k % 7 === sevenRest &&
              //   k % 11 === elevenRest &&
              //   k % 13 === thirteenRest &&
              //   k % 17 === seventeenRest &&
              //   k % 19 === nineteenRest
              // ) {
              theNumber = i;
              break;
            }
          }

          console.log(
            "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              theNumber    \x1b[8m\x1b[40m\x1b[0m%c fReal.jsx 91 \n",
            "color: white; background: black; font-weight: bold",
            "",
            theNumber
          );

          // data[data[i].false].items.push(worryLevel);
          data[data[i].false].items.push(theNumber);
        }
      });
      data[i].items = [];
    }
  }

  console.log(
    data[0].inspectedTimes,
    data[1].inspectedTimes,
    data[2].inspectedTimes,
    data[3].inspectedTimes
  );

  let inspectedTimesArr = data
    .map((monkey) => monkey.inspectedTimes)
    .sort()
    .reverse();

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    inspectedTimesArr    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    inspectedTimesArr[0] * inspectedTimesArr[1]
  );

  return <div></div>;
};
