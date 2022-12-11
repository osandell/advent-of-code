import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  for (let k = 1; k < 2; k += 1) {
    // const data = eData
    //   .split("\n\n")
    //   .map((monkeyChunk) => monkeyChunk.split("\n"))
    //   .map((line, index) => {
    //     const funcs = [
    //       (old) => old * 19,
    //       (old) => old + 6,
    //       (old) => old * old,
    //       (old) => old + 3,
    //     ];

    //     return {
    //       monkeyNr: parseInt(line[0].split(" ")[1]),
    //       items: line[1]
    //         .split(": ")[1]
    //         .split(", ")
    //         .map((nr) => parseInt(nr)),
    //       operation: funcs[index],
    //       test: parseInt(line[3].split("by ")[1]),
    //       true: parseInt(line[4].split("monkey ")[1]),
    //       false: parseInt(line[5].split("monkey ")[1]),
    //       inspectedTimes: 0,
    //     };
    //   });

    // for (let j = 0; j < 3; j++) {
    //   for (let i = 0; i < data.length; i++) {
    //     data[i].items.forEach((item) => {
    //       let worryLevel = item;
    //       i === 0 &&
    //         j === 1 &&
    //         console.log(
    //           "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      1          i 0 j 2    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 67 \n",
    //           "color: white; background: black; font-weight: bold",
    //           "",
    //           true,
    //           i,
    //           data[i].test,
    //           worryLevel
    //         );

    //       worryLevel = data[i].operation(worryLevel);

    //       i === 0 &&
    //         j === 1 &&
    //         console.log(
    //           "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      2          i 0 j 2    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 67 \n",
    //           "color: white; background: black; font-weight: bold",
    //           "",
    //           true,
    //           i,
    //           data[i].test,
    //           worryLevel
    //         );

    //       data[i].inspectedTimes = data[i].inspectedTimes + 1;

    //       if (worryLevel % data[i].test === 0) {
    //         console.log(
    //           "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                true    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 44 \n",
    //           "color: white; background: black; font-weight: bold",
    //           "",
    //           true
    //         );
    //         data[data[i].true].items.push(worryLevel);
    //       } else {
    //         data[data[i].false].items.push(worryLevel);
    //       }
    //     });
    //     data[i].items = [];
    //   }

    //   // console.log(
    //   //   // sumInspectedTimes,
    //   //   data[0].inspectedTimes,
    //   //   data[1].inspectedTimes,
    //   //   data[2].inspectedTimes,
    //   //   data[3].inspectedTimes
    //   // );
    // }

    const data = eData
      .split("\n\n")
      .map((monkeyChunk) => monkeyChunk.split("\n"))
      .map((line, index) => {
        const funcs = [
          (old) => old.mult.push(19),
          (old) => {
            old.add = old.add + 6;
          },
          (old) => old.mult.push(...old.mult),
          (old) => {
            old.add = old.add + 3;
          },
        ];

        return {
          monkeyNr: parseInt(line[0].split(" ")[1]),
          items: line[1]
            .split(": ")[1]
            .split(", ")
            .map((nr) => {
              return { mult: [parseInt(nr)], add: 0 };
            }),
          operation: funcs[index],
          test: parseInt(line[3].split("by ")[1]),
          true: parseInt(line[4].split("monkey ")[1]),
          false: parseInt(line[5].split("monkey ")[1]),
          inspectedTimes: 0,
        };
      });

    const test = -1;
    let trail;
    let yo = 0;

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < data.length; i++) {
        data[i].items.forEach((item) => {
          let worryLevel = item;

          i === 0 &&
            j === 1 &&
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c     1           i 0 j 2    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 67 \n",
              "color: white; background: black; font-weight: bold",
              "",
              "add",
              worryLevel.add,
              "mult",
              worryLevel.mult,
              "add + mult",
              worryLevel.add + worryLevel.mult.reduce((a, b) => a * b)
            );

          data[i].operation(worryLevel);

          i === 0 &&
            j === 1 &&
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c     1           i 0 j 2    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 67 \n",
              "color: white; background: black; font-weight: bold",
              "",
              "add",
              worryLevel.add,
              "mult",
              worryLevel.mult.reduce((a, b) => a * b),
              "add + mult",
              worryLevel.add + worryLevel.mult.reduce((a, b) => a * b)
            );

          data[i].inspectedTimes = data[i].inspectedTimes + 1;

          if (
            (worryLevel.add + worryLevel.mult.reduce((a, b) => a * b)) %
              data[i].test ===
            0
          ) {
            data[data[i].true].items.push(worryLevel);
          } else {
            data[data[i].false].items.push(worryLevel);
          }
        });
        data[i].items = [];
      }

      // console.log(
      //   // sumInspectedTimes,
      //   data[0].inspectedTimes,
      //   data[1].inspectedTimes,
      //   data[2].inspectedTimes,
      //   data[3].inspectedTimes
      // );
    }
  }

  return <div></div>;
};
