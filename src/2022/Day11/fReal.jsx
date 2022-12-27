import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  const data = rData
    .split("\n\n")
    .map((monkeyChunk) => monkeyChunk.split("\n"))
    .map((line, index) => {
      const funcsE = [
        (old) => old * 19,
        (old) => old + 6,
        (old) => old * old,
        (old) => old + 3,
      ];

      const funcsR = [
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
        operation: funcsR[index],
        test: parseInt(line[3].split("by ")[1]),
        true: parseInt(line[4].split("monkey ")[1]),
        false: parseInt(line[5].split("monkey ")[1]),
        inspectedTimes: 0,
      };
    });

  var startTime = performance.now();
  for (let j = 0; j < 10000; j++) {
    for (let i = 0; i < data.length; i++) {
      data[i].items.forEach((item) => {
        let worryLevel = item;

        if (j % 100 === 0) console.log(j, worryLevel);

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        let result = data[i].operation(worryLevel);
        if (result > 9007199254740991) {
          for (let k = 0; k < 9007199254740991; k++) {
            if (
              k % 2 === worryLevel % 2 &&
              k % 3 === worryLevel % 3 &&
              k % 5 === worryLevel % 5 &&
              k % 7 === worryLevel % 7 &&
              k % 11 === worryLevel % 11 &&
              // k % 23 === worryLevel % 23 &&
              k % 13 === worryLevel % 13 &&
              k % 17 === worryLevel % 17 &&
              k % 19 === worryLevel % 19
            ) {
              worryLevel = k;
              break;
            }
          }

          worryLevel = data[i].operation(worryLevel);
        } else {
          worryLevel = result;
        }

        if (worryLevel % data[i].test === 0) {
          data[data[i].true].items.push(worryLevel);
        } else {
          data[data[i].false].items.push(worryLevel);
        }
      });
      data[i].items = [];
    }
  }
  var endTime = performance.now();

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      done:    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 437 \n",
    "color: white; background: black; font-weight: bold",
    "",
    endTime - startTime
  );

  let inspectedTimesArr = data
    .map((monkey) => monkey.inspectedTimes)
    .sort((a, b) => b - a);

  for (let i = 0; i < inspectedTimesArr.length; i++) {
    console.log(inspectedTimesArr[i]);
  }

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    inspectedTimesArr    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    inspectedTimesArr[0] * inspectedTimesArr[1]
  );

  return <div></div>;
};
