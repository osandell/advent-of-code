import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";
import { max } from "mathjs";

export default () => {
  const data = rData
    .split("\n\n")
    .map((monkeyChunk) => monkeyChunk.split("\n"))
    .map((line, index) => {
      const funcsE = [
        (old) => old * 19n,
        (old) => old + 6n,
        (old) => old * old,
        (old) => old + 3n,
      ];

      const funcsR = [
        (old) => old * 13n,
        (old) => old + 4n,
        (old) => old * 11n,
        (old) => old + 8n,
        (old) => old * old,
        (old) => old + 5n,
        (old) => old + 1n,
        (old) => old + 3n,
      ];

      return {
        items: line[1]
          .split(": ")[1]
          .split(", ")
          .map((nr) => BigInt(parseInt(nr))),
        operation: funcsR[index],
        test: BigInt(parseInt(line[3].split("by ")[1])),
        true: parseInt(line[4].split("monkey ")[1]),
        false: parseInt(line[5].split("monkey ")[1]),
        inspectedTimes: 0,
      };
    });

  let maxResult = 0n;
  let startTime = performance.now();
  for (let j = 0; j < 100; j++) {
    for (let i = 0; i < data.length; i++) {
      data[i].items.forEach((item) => {
        let worryLevel = item;

        if (j % 100 === 0) console.log(j, worryLevel);

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        let result = data[i].operation(worryLevel);
        // if (result > 9007199254740991n) {
        //   for (let k = 0n; k < 9007199254740991n; k++) {
        //     if (
        //       k % 2n === worryLevel % 2n &&
        //       k % 3n === worryLevel % 3n &&
        //       k % 5n === worryLevel % 5n &&
        //       k % 7n === worryLevel % 7n &&
        //       k % 11n === worryLevel % 11n &&
        //       // k % 23n === worryLevel % 23n &&
        //       k % 13n === worryLevel % 13n &&
        //       k % 17n === worryLevel % 17n &&
        //       k % 19n === worryLevel % 19n
        //     ) {
        //       worryLevel = k;
        //       break;
        //     }
        //   }

        //   worryLevel = data[i].operation(worryLevel);
        // } else {
        worryLevel = result;
        // }

        if (result > maxResult) {
          maxResult = result;
        }

        if (worryLevel % data[i].test === 0n) {
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

  // console.log(
  //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      maxResult    \x1b[8m\x1b[40m\x1b[0m%c fRealTest.jsx 100 \n",
  //   "color: white; background: black; font-weight: bold",
  //   "",
  //   maxResult.toString()
  // );

  for (let i = 0; i < data.length; i++) {
    console.log(data[i].inspectedTimes);
  }

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
